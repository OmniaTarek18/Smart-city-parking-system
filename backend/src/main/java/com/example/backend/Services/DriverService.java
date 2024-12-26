package com.example.backend.Services;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.stereotype.Service;

import com.example.backend.Enums.UserStatus;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverService {
    
    private final DataSource dataSource;
    private final UserRepository userRepository;

    public void blockDriver(String email) {
        Connection connection = null;

        Integer userId = userRepository.findUserByEmail(email);
        if (userId == null) {
            throw new IllegalArgumentException("Email does not exist");
        }
        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);

            userRepository.updateStatus(userId, UserStatus.BLOCKED);

            connection.commit();
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback(); // Roll back the transaction in case of error
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw new RuntimeException("Error blocking driver: " + e.getMessage(), e);
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException closeEx) {
                    closeEx.printStackTrace();
                }
            }
        }
    }
}
