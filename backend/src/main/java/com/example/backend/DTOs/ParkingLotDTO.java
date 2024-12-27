package com.example.backend.DTOs;

public record ParkingLotDTO(
        int id,
        String name,
        double latitude,
        double longitude,
        int capacity_regular,
        int capacity_handicap,
        int capacity_ev,
        int owner_id
) {
}