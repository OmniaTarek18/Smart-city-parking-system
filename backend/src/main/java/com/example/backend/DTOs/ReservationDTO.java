package com.example.backend.DTOs;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.example.backend.Enums.SpotType;

public record ReservationDTO(
        LocalTime duration,        
        LocalDateTime startTime,
        int parkingLotId,
        SpotType spotType,
        double price) {
}