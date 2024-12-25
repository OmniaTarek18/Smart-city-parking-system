package com.example.backend.Repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

public class ParkingLotRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
}
