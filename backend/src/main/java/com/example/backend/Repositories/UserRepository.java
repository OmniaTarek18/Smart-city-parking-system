package com.example.backend.Repositories;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

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
            throw new IllegalArgumentException("No user found with the given email");
        }
    }
}
