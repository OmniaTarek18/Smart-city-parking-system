package com.example.backend.Repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LotManagerRepository {
    
    public void insertLotManager(Connection connection, Integer userId, String name, String phone) throws SQLException {
        String insertLotManagerSQL = "INSERT INTO lotmanager (User_id, name, phone_number) VALUES (?, ?, ?)";
        try (PreparedStatement lotManagerStatement = connection.prepareStatement(insertLotManagerSQL)) {
            lotManagerStatement.setInt(1, userId);
            lotManagerStatement.setString(2, name);
            lotManagerStatement.setString(3, phone);

            lotManagerStatement.executeUpdate();
        }
    }

}
