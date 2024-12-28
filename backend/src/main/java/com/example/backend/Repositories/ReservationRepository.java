package com.example.backend.Repositories;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.backend.DTOs.ReservationDTO;
import com.example.backend.Enums.ReservationStatus;
import com.example.backend.Enums.SpotType;

import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Time;

@Repository
@RequiredArgsConstructor
public class ReservationRepository {
    private final JdbcTemplate jdbcTemplate;

    @Transactional
    public Integer findAvailableSpot(int parkingLotId, SpotType spotType) {
        String sql = """
                SELECT id
                FROM parkingspot
                WHERE ParkingLot_id = ? AND type = ? AND status = 'AVAILABLE'
                LIMIT 1
                """;

        return jdbcTemplate.query(sql, rs -> {
            if (rs.next()) {
                return rs.getInt("id");
            }
            return null;
        }, parkingLotId, spotType.toString());
    }

    @Transactional
    public int createReservation(int userId, ReservationDTO body) {
        Integer spotId = findAvailableSpot(body.parkingLotId(), body.spotType());

        if (spotId == null) {
            throw new RuntimeException("No available spot found for the selected lot and type.");
        }

        String sql = """
                INSERT IGNORE INTO Reservation
                (Driver_id, ParkingSpot_id, ParkingLot_id, duration, start_time, status, price)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, userId);
            ps.setInt(2, spotId);
            ps.setInt(3, body.parkingLotId());
            ps.setTime(4, Time.valueOf(body.duration()));
            ps.setTimestamp(5, Timestamp.valueOf(body.startTime()));
            ps.setString(6, ReservationStatus.PENDING.name());
            ps.setDouble(7, body.price());
            return ps;
        }, keyHolder);

        markSpotAsReserved(spotId);

        if (keyHolder.getKey() != null) {
            return keyHolder.getKey().intValue();
        } else {
            throw new RuntimeException("Failed to create reservation. No ID generated.");
        }
    }

    @Transactional
    private void markSpotAsReserved(int spotId) {
        String sql = "UPDATE parkingspot SET status = 'RESERVED' WHERE id = ?";
        jdbcTemplate.update(sql, spotId);
    }

    @Transactional
    private void markSpotAsOccupied(int spotId) {
        String sql = "UPDATE parkingspot SET status = 'RESERVED' WHERE id = ?";
        jdbcTemplate.update(sql, spotId);
    }

    @Transactional
    private void markSpotAsAvailable(int spotId) {
        String sql = "UPDATE parkingspot SET status = 'RESERVED' WHERE id = ?";
        jdbcTemplate.update(sql, spotId);
    }
}
