package com.example.backend.Repositories;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.TopLotDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class ParkingLotRepository {

    private final JdbcTemplate jdbc;

    public List<TopLotDTO> getTopLots(int pageSize, int pageNum) {
        String query = "SELECT pl.name, " +
                "(COUNT(CASE WHEN ps.status = 'OCCUPIED' THEN 1 END) / COUNT(ps.id)) * 100 AS occupancy_rate, " +
                "SUM(r.price) AS total_revenue, " +
                "COUNT(CASE WHEN r.status = 'CANCELLED' OR r.status = 'EXPIRED' THEN 1 END) AS violations, " +
                "((0.5 * (COUNT(CASE WHEN ps.status = 'OCCUPIED' THEN 1 END) / COUNT(ps.id)) * 100) + " + 
                "(0.4 * SUM(r.price)) - " +
                "(0.1 * COUNT(CASE WHEN r.status = 'CANCELLED' OR r.status = 'EXPIRED' THEN 1 END))) AS score " +
                "FROM ParkingLot pl " +
                "JOIN ParkingSpot ps ON pl.id = ps.ParkingLot_id " +
                "LEFT JOIN Reservation r ON ps.id = r.ParkingSpot_id " +
                "WHERE Date(r.start_time) = CURDATE() " +
                "GROUP BY pl.id " +
                "ORDER BY score DESC " +
                "LIMIT ? OFFSET ?;";

        return jdbc.query(query, (rs, rowNum) -> {
            TopLotDTO lotDTO = new TopLotDTO();
            lotDTO.setLotName(rs.getString("name"));
            lotDTO.setOccupancyRate(rs.getInt("occupancy_rate"));
            lotDTO.setTotalRevenue(rs.getInt("total_revenue"));
            lotDTO.setViolations(rs.getInt("violations"));
            lotDTO.setScore(rs.getInt("score"));
            return lotDTO;
        }, pageSize, (pageNum-1) * pageSize);
    }
}
