package com.example.backend.Repositories;

import java.time.LocalDate;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.Enums.Role;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DriverRepository {
    private final JdbcTemplate jdbc;

    public int findDriverByUserId(int userId) {
        try {
            String query = "SELECT id FROM driver WHERE User_id = ?";
            return jdbc.queryForObject(query, int.class, userId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Driver is not found");
        }
    }

    public int addDriver(String firstName, String lastName, String phoneNumber, String cardHolderName, String cvv,
            LocalDate expirationDate,String cardNumber, String licensePlate, int userId) {
        try {
            String query1 = "INSERT INTO driver ( first_name, last_name, phone_number, card_holder_name, card_expiry_date, card_no, cvv, license_plate_number, User_id) values (?,?,?,?,?,?,?,?,?)";
            jdbc.update(query1, firstName, lastName, phoneNumber, cardHolderName, expirationDate, cardNumber, cvv, licensePlate, userId);
            String query2 = "SELECT id FROM driver WHERE User_id = ?";
            int id = jdbc.queryForObject(query2, int.class, userId);
            return id;
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("can't add new driver");
        }
    }
}