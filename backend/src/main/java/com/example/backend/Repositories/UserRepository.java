package com.example.backend.Repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.TopUserDTO;
import com.example.backend.Enums.Role;
import com.example.backend.Enums.UserStatus;

import lombok.RequiredArgsConstructor;

// here all functions for all users (the functions they shared)
@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final JdbcTemplate jdbc;
    private final BCryptPasswordEncoder passwordEncoder;

    // Method to authenticate a driver
    public Integer findUserByEmailAndPassword(String email, String password, String type) {
        try {
            String query = "SELECT id, password FROM " + type + " WHERE email = ?";
            return jdbc.queryForObject(query, (rs, rowNum) -> {
                String storedPassword = rs.getString("password");
                Integer id = rs.getInt("id");

                // Replace plain text comparison with a hashing library like BCrypt
                if (!passwordEncoder.matches(password, storedPassword)) {
                    throw new IllegalArgumentException("Incorrect password");
                }
                return id;
            }, email);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Email is not found");
        }
    }

    public Integer findUserByEmail(String email) {
        try {
            String query = "SELECT id FROM user WHERE email = ?";
            return jdbc.queryForObject(query, Integer.class, email);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    public Integer insertUser(Connection connection, String email, String password, Role role, UserStatus status)
            throws SQLException {

        String userInsertSQL = "INSERT INTO user (email, password, role, status) VALUES (?, ?, ?, ?)";
        try (PreparedStatement userStatement = connection.prepareStatement(userInsertSQL,
                PreparedStatement.RETURN_GENERATED_KEYS)) {
            userStatement.setString(1, email);
            userStatement.setString(2, password);
            userStatement.setString(3, role.toString());
            userStatement.setString(4, status.toString());
            int affectedRows = userStatement.executeUpdate();

            if (affectedRows > 0) {
                try (ResultSet generatedKeys = userStatement.getGeneratedKeys()) {
                    if (generatedKeys.next()) {
                        // Retrieve the generated key (ID)
                        return generatedKeys.getInt(1);
                    } else {
                        throw new SQLException("Creating user failed, no ID obtained.");
                    }
                }
            } else {
                throw new SQLException("Creating user failed, no rows affected.");
            }
        }
    }

    public int insertUserIfNotExists(String email, String password, Role role, UserStatus status) {
        String insertSQL = "INSERT INTO user (email, password, role, status)" + " SELECT ?, ?, ?, ?"
                + " WHERE NOT EXISTS (SELECT 1 FROM user WHERE email = ?)";
        return jdbc.update(insertSQL, email, password, role.toString(), status.toString(), email);
    }

    public int updateStatusIfExists(String email, Role role, UserStatus status) {
        String query = "UPDATE user SET status = ? WHERE email = ? AND role = ?";
        return jdbc.update(query, status.toString(), email, role.toString());
    }

    public int deleteAdminIfMoreThanOne(Integer userId) {
        String query = "DELETE u FROM user u "
                + "JOIN (SELECT 1 AS to_delete FROM user WHERE role = 'SystemAdmin' HAVING COUNT(*) > 1) AS admins "
                + "WHERE u.id = ? AND u.role = 'SystemAdmin'";
        return jdbc.update(query, userId);
    }

    public List<TopUserDTO> getTopDrivers(Integer pageSize, Integer pageNum) {
        String query = "SELECT d.id AS driver_id, " + 
                        "d.name AS driver_name," + 
                        "COALESCE(res.completed_reservations, 0) AS successful_reservations, " + 
                        "COALESCE(viol.total_violations, 0) AS violations, " + 
                        "(COALESCE(res.completed_reservations, 0) - COALESCE(viol.total_violations, 0)) AS score " +
                        "FROM Driver d " + 
                        "LEFT JOIN (SELECT Driver_id, COUNT(*) AS completed_reservations " + 
                        "FROM Reservation WHERE status = 'COMPLETED' GROUP BY Driver_id) " +
                        "res ON d.id = res.Driver_id " + 
                        "LEFT JOIN (SELECT Driver_id, COUNT(*) AS total_violations " + 
                        "FROM Violation GROUP BY Driver_id) " +
                        "viol ON d.id = viol.Driver_id " +
                        "ORDER BY score DESC, successful_reservations DESC " +
                        "LIMIT ? OFFSET ?;";

        return jdbc.query(query, (rs, rowNum) -> {
            return new TopUserDTO(
                rs.getString("driver_name"),
                rs.getInt("successful_reservations"),
                rs.getInt("violations"),
                rs.getInt("score")
            );
        }, pageSize, (pageNum-1) * pageSize);
    }
}
