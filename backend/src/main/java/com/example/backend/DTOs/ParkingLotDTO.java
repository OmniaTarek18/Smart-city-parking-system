package com.example.backend.DTOs;

public record ParkingLotDTO(
        int id,
        String name,
        double latitude,
        double longitude,
        int capacity,
        int ownerId
) {
}