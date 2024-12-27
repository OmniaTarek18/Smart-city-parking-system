package com.example.backend.Repositories;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.backend.DTOs.LotManagerSearchCriteriaDTO;
import com.example.backend.DTOs.ResponseLotManagerSearchDTO;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LotManagerRepository {

    private final JdbcTemplate jdbcTemplate;

    public void insertLotManager(Connection connection, Integer userId, String name, String phone) throws SQLException {
        String insertLotManagerSQL = "INSERT INTO lotmanager (User_id, name, phone_number) VALUES (?, ?, ?)";
        try (PreparedStatement lotManagerStatement = connection.prepareStatement(insertLotManagerSQL)) {
            lotManagerStatement.setInt(1, userId);
            lotManagerStatement.setString(2, name);
            lotManagerStatement.setString(3, phone);

            lotManagerStatement.executeUpdate();
        }
    }

    public List<ResponseLotManagerSearchDTO> searchLotManagers(LotManagerSearchCriteriaDTO criteria) {
        StringBuilder query = new StringBuilder(
                "SELECT lm.id AS lotManagerId, u.email AS email, lm.name AS name, lm.phone_number AS phone " +
                        "FROM LotManager lm " +
                        "JOIN User u ON lm.User_id = u.id " +
                        "WHERE 1=1");

        List<Object> params = new ArrayList<>();

        if (criteria.name() != null && !criteria.name().isEmpty()) {
            query.append(" AND LOWER(name) LIKE LOWER(?)");
            params.add("%" + criteria.name() + "%");
        }
        if (criteria.email() != null && !criteria.email().isEmpty()) {
            query.append(" AND LOWER(email) LIKE LOWER(?)");
            params.add("%" + criteria.email() + "%");
        }
        if (criteria.phone() != null && !criteria.phone().isEmpty()) {
            query.append(" AND LOWER(phone_number) LIKE LOWER(?)");
            params.add("%" + criteria.phone() + "%");
        }
        query.append(" LIMIT ? OFFSET ?");
        params.add(criteria.pageSize());
        params.add((criteria.pageNum() - 1) * criteria.pageSize());

        return jdbcTemplate.query(query.toString(), (rs, rowNum) -> {
            return new ResponseLotManagerSearchDTO(
                    rs.getString("name"),
                    rs.getString("email"),
                    rs.getString("phone"));
        }, params.toArray());
    }

}
