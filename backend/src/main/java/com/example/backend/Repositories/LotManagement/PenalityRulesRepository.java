package com.example.backend.Repositories.LotManagement;

import com.example.backend.DTOs.PenalityRulesDTO;
import com.example.backend.Enums.PenaltyStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PenalityRulesRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private static final String INSERT_QUERY = "insert into PenalityRules (penality_type, LotManager_id, cost, time) values (?, ?, ?, ?)";
    private static final String SELECT_QUERY = "select * from PenalityRules where LotManager_id = ?";
  
    public int addPenalityRule(PenalityRulesDTO dto) {
        return jdbcTemplate.update(
                INSERT_QUERY,
                dto.penality_type().toString(),
                dto.LotManager_id(),
                dto.cost(),
                dto.time());
    }

    public List<PenalityRulesDTO> getPenalityRulesByManagerId(int lotManagerId) {
        return jdbcTemplate.query(
                SELECT_QUERY,
                new Object[] { lotManagerId },
                (rs, rowNum) -> mapRowToDTO(rs));
    }


    private PenalityRulesDTO mapRowToDTO(ResultSet rs) throws SQLException {
        return new PenalityRulesDTO(
                PenaltyStatus.valueOf(rs.getString("penality_type")),
                rs.getInt("LotManager_id"),
                rs.getDouble("cost"),
                rs.getString("time"));
    }
}
