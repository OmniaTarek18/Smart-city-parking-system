package com.example.backend.Repositories;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.ParkingLot;
import com.example.backend.DTOs.SearchParkingLotsDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class SearchParkingLotsRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<ParkingLot> findParkingLots(SearchParkingLotsDTO searchParkingLotsDTO, int page, int size) {
        String sql = """
                SELECT DISTINCT `name`, parkinglot.id as parking_lot_id, cost, congestion_added_percent
                FROM parkinglot
                INNER JOIN parkingspot
                ON parkingspot.ParkingLot_id = parkinglot.id
                INNER JOIN pricingstrategy
                ON pricingstrategy.ParkingLot_id = parkinglot.id AND pricingstrategy.spot_type = parkingspot.type
                WHERE parkingspot.type = ?
                AND ST_Distance(parkinglot.location, ST_GeomFromText(?)) < 0.036
                AND parkingspot.status = 'AVAILABLE'
                LIMIT ? OFFSET ?;
                """;
        String point = String.format("POINT(%f %f)",
                searchParkingLotsDTO.location().latitude(),
                searchParkingLotsDTO.location().longitude());

        return jdbcTemplate.query(sql, this::mapParkingLot, searchParkingLotsDTO.spotType().toString(),
                point,
                size,
                (page - 1) * size);
    }

    private ParkingLot mapParkingLot(ResultSet rs, int rowNum) throws SQLException {
        // Extracting values from ResultSet
        String parkingLotName = rs.getString("name");
        int parkingLotId = rs.getInt("parking_lot_id");
        double cost = rs.getDouble("cost");
        double congestionAddedPercent = rs.getDouble("congestion_added_percent");

        return new ParkingLot(parkingLotName, parkingLotId, cost, congestionAddedPercent);
    }
}
