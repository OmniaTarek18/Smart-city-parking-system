package com.example.backend.DTOs;
import com.example.backend.Enums.SpotType;
import com.example.backend.Enums.SpotStatus;

public record ParkingSpotDTO(
        int id,
        int ParkingLot_id,
        SpotType type,
        SpotStatus status
) {
}