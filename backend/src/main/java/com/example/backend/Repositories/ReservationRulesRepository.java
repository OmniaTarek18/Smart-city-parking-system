package com.example.backend.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.ReservationRulesDTO;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ReservationRulesRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ReservationRulesRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

public ReservationRulesDTO findByLotManagerId(Integer lotManagerId) {
    String sql = "select * from ReservationRules where LotManager_id = ?";
    List<ReservationRulesDTO> results = jdbcTemplate.query(sql, this::mapRowToDTO, lotManagerId);
    return results.isEmpty() ? null : results.get(0);
}

    public void save(ReservationRulesDTO dto) {
        String sql = "insert into ReservationRules (LotManager_id, time_limit) values (?, ?) " +
                "on duplicate key update time_limit = ?";
        jdbcTemplate.update(sql, dto.LotManager_id(), dto.time_limit(), dto.time_limit());
    }

    public void deleteByLotManagerId(Integer lotManagerId) {
        String sql = "delete from ReservationRules where LotManager_id = ?";
        jdbcTemplate.update(sql, lotManagerId);
    }

    private ReservationRulesDTO mapRowToDTO(ResultSet rs, int rowNum) throws SQLException {

        return new ReservationRulesDTO(
                rs.getInt("LotManager_id"),
                rs.getString("time_limit"));
    }
}
