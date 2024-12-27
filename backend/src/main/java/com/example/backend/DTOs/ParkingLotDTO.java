package com.example.backend.DTOs;

public record ParkingLotDTO(
        int id,
        String name,
        Point location,
        int capacity_regular,
        int capacity_handicap,
        int capacity_ev,
        int owner_id
) {
}