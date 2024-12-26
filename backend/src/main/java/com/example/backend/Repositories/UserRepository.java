package com.example.backend.Repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

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

    public Integer findUserById(Integer userId) {
        try {
            String query = "SELECT id FROM user WHERE id = ?";
            return jdbc.queryForObject(query, Integer.class, userId);
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

    public int countActiveUsers(Role role) {
        String query = "SELECT COUNT(*) FROM user WHERE role = ? AND status = 'ACTIVE'";
        return jdbc.queryForObject(query, Integer.class, role.toString());
    }

    public void updateStatus(Integer userId, UserStatus status) {
        String query = "UPDATE user SET status = ? WHERE id = ?";
        jdbc.update(query, status.toString(), userId);
    }

    public void deleteUser(Integer userId) {
        String query = "DELETE FROM user WHERE id = ?";
        jdbc.update(query, userId);
    }
}
