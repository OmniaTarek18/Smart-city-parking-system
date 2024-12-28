package com.example.backend.Repositories;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

import org.springframework.jdbc.core.RowMapper;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.Reservation;
import java.util.List;
import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ReservationRepository {
    private final JdbcTemplate jdbc;

    public List<Reservation> findReservationById(int driver_id, String status) {
        String query = "SELECT start_time, ParkingSpot_id, name, duration, price FROM Reservation " +
                       "JOIN ParkingLot ON ParkingLot.id = Reservation.ParkingLot_id " +
                       "WHERE Driver_id = ? AND status = ?";
        return jdbc.query(query, (rs, rowNum) -> new Reservation(
            rs.getTimestamp("start_time").toLocalDateTime(),
            rs.getInt("ParkingSpot_id"),
            rs.getString("name"),
            rs.getTime("duration").toLocalTime(),
            rs.getDouble("price")
        ), driver_id, status);
    }

}