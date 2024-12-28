package com.example.backend.DTOs;

import java.time.LocalDateTime;
import java.time.LocalTime;

public record Reservation(
    LocalDateTime startTime,
    int parkingSpotId,
    String parkingLotName,
    LocalTime duration,
    double price
) {
} 
