package com.example.backend.DTOs;
import com.example.backend.Enums.SpotType;
import com.example.backend.Enums.SpotStatus;

public record ParkingSpotDTO(
        int id,
        int parkingLotId,
        SpotType type,
        SpotStatus status
) {
}