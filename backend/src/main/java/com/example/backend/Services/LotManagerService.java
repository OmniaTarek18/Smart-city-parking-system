package com.example.backend.Services;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.LotManagerDTO;
import com.example.backend.DTOs.LotManagerSearchCriteriaDTO;
import com.example.backend.DTOs.ResponseLotManagerSearchDTO;
import com.example.backend.Enums.Role;
import com.example.backend.Enums.UserStatus;
import com.example.backend.Repositories.LotManagerRepository;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LotManagerService {

    private final DataSource dataSource;
    private final LotManagerRepository lotManagerRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void addLotManager(LotManagerDTO lotManagerDTO) {
        Connection connection = null;

        Integer userId = userRepository.findUserByEmail(lotManagerDTO.email());
        if (userId != null) {
            throw new IllegalArgumentException("Email already exists");
        }
        try {
            connection = dataSource.getConnection();
            connection.setAutoCommit(false);

            userId = userRepository.insertUser(connection, lotManagerDTO.email(),
                    passwordEncoder.encode(lotManagerDTO.password()), Role.LotManager, UserStatus.ACTIVE);
            lotManagerRepository.insertLotManager(connection, userId, lotManagerDTO.name(), lotManagerDTO.phone());

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

    public List<ResponseLotManagerSearchDTO> searchLotManagers(LotManagerSearchCriteriaDTO criteria) {
        return lotManagerRepository.searchLotManagers(criteria);
    }
}
