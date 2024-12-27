package com.example.backend.Repositories.LotManagement;
import com.example.backend.DTOs.PricingStrategyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class PricingStrategyRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PricingStrategyRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public PricingStrategyDTO findByParkingLotIdAndSpotType(int parkingLotId, String spotType) {
        String sql = "select spot_type, ParkingLot_id, cost, congestion_added_percent from PricingStrategy " +
                "where ParkingLot_id = ? and spot_type = ?";
        return jdbcTemplate.queryForObject(sql, this::mapRowToPricingStrategyDTO, parkingLotId, spotType);
    }

    public int save(PricingStrategyDTO pricingStrategy) {
        String sql = "insert into PricingStrategy (spot_type, ParkingLot_id, cost, congestion_added_percent) " +
                "values (?, ?, ?, ?) " +
                "on duplicate key update cost = ?, congestion_added_percent = ?";
        return jdbcTemplate.update(sql,
                pricingStrategy.spot_type(),
                pricingStrategy.parkingLot_id(),
                pricingStrategy.cost(),
                pricingStrategy.congestion_added_percent(),
                pricingStrategy.cost(),
                pricingStrategy.congestion_added_percent());
    }

    public int delete(int parkingLotId, String spotType) {
        String sql = "delete from PricingStrategy where ParkingLot_id = ? and spot_type = ?";
        return jdbcTemplate.update(sql, parkingLotId, spotType);
    }

    private PricingStrategyDTO mapRowToPricingStrategyDTO(ResultSet rows, int rowNum) throws SQLException {
        return new PricingStrategyDTO(
                rows.getString("spot_type"),
                rows.getInt("ParkingLot_id"),
                rows.getDouble("cost"),
                rows.getDouble("congestion_added_percent"));
    }
}
