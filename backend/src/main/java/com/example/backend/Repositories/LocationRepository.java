package com.example.backend.Repositories;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.Point;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LocationRepository {
    private final JdbcTemplate jdbcTemplate;

    public Point findCoordinatesById(int lotId) {
        String sql = "SELECT ST_X(location) as latitude, ST_Y(location) as longitude FROM parkinglot WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, this::mapPoint, lotId);
    }

    private Point mapPoint(ResultSet rs, int rowNum) throws SQLException {
        // use getDouble directly ....
        double latitude = rs.getDouble("latitude");
        double longitude = rs.getDouble("longitude");
        return new Point(latitude, longitude);
    }

}
