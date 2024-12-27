package com.example.backend.DTOs;

public record ParkingLot(
        String name,
        int parkingLotId,
        double cost,
        double congestionAddedPercent) {
}
