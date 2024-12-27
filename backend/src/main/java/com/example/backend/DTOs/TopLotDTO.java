package com.example.backend.DTOs;

public record TopLotDTO(
        String lotName,
        int occupancyRate,
        int totalRevenue,
        int violations,
        int score) {

}
