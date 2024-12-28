package com.example.backend.Repositories;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SpotRepository {
    private final JdbcTemplate jdbc;

    public void update(int id, int parkingLotId, String status) {
        try {
            String query = "update ParkingSpot set status = ? where id = ? and ParkingLot_id = ?";
            jdbc.update(query,status, id, parkingLotId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Email is not found");
        }
    }
}
