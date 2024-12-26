package com.example.backend.Repositories;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class LotManagerRepository {
    private final JdbcTemplate jdbc;
    
    public int findLotManagerByUserId(int userId) {
         try {
            String query = "SELECT id FROM lotmanager WHERE User_id = ?";
            return jdbc.queryForObject(query, int.class , userId);
        } catch (EmptyResultDataAccessException e) {
            throw new IllegalArgumentException("Lot Manager is not found");
        }
    }
}