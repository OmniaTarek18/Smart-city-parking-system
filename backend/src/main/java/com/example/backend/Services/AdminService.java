package com.example.backend.Services;

import java.sql.Connection;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.AdminDTO;
import com.example.backend.Enums.Role;
import com.example.backend.Enums.UserStatus;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final DataSource dataSource;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void addAdmin(AdminDTO adminDTO) {
        Connection connection = null;

        Integer userId = userRepository.findUserByEmail(adminDTO.email());
        if (userId != null) {
            throw new IllegalArgumentException("Email already exists");
        }
        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);

            userRepository.insertUser(connection, adminDTO.email(),
                    passwordEncoder.encode(adminDTO.password()), Role.SystemAdmin, UserStatus.ACTIVE);

            connection.commit();
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback(); // Roll back the transaction in case of error
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw new RuntimeException("Error adding lot manager: " + e.getMessage(), e);
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

    public void deleteAdmin(Integer id) {
        Connection connection = null;

        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);

            int numOfAdmins = userRepository.countActiveUsers(Role.SystemAdmin);
            if (numOfAdmins == 1) {
                throw new IllegalArgumentException("Cannot delete the last admin");
            } else {
                userRepository.updateStatus(id, UserStatus.DELETED);
            }

            connection.commit();
        } catch (SQLException e) {
            if (connection != null) {
                try {
                    connection.rollback(); // Roll back the transaction in case of error
                } catch (SQLException rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw new RuntimeException("Error deleting admin: " + e.getMessage(), e);
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
