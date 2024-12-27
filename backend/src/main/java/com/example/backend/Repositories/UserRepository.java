package com.example.backend.Repositories;

import java.sql.SQLIntegrityConstraintViolationException;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import com.example.backend.Enums.Role;
import lombok.RequiredArgsConstructor;

// here all functions for all users (the functions they shared)
@Repository
@RequiredArgsConstructor
public class UserRepository {

    private final JdbcTemplate jdbc;
    private final BCryptPasswordEncoder passwordEncoder;

    public int findUserByEmailAndPassword(String email, String password) {
        try {
            String query = "SELECT id, password FROM user WHERE email = ?";
            return jdbc.queryForObject(query, (rs, rowNum) -> {
                String storedPassword = rs.getString("password");
                int id = rs.getInt("id");

                if (!passwordEncoder.matches(password, storedPassword)) {
                    throw new IllegalArgumentException("Incorrect password");
                }
                return id;
            }, email);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Email is not found");
        }
    }

    public int addUser(String email, String password, Role role) {
        try {
            String query1 ="INSERT INTO user (email, password, role) values (?,?,?)";
            String hashedPassword = passwordEncoder.encode(password);
            jdbc.update(query1, email, hashedPassword, role.toString());
            String query2 = "SELECT id FROM user WHERE email = ?";
            int id = jdbc.queryForObject(query2, int.class, email);
            return id;

        } catch (Exception e) {
            throw new IllegalArgumentException("Email exists already");
        }
    }
}
