package com.example.backend.DTOs;

import com.example.backend.Enums.SpotType;

public record SearchParkingLotsDTO(
                Point location,
                SpotType spotType) {
}
