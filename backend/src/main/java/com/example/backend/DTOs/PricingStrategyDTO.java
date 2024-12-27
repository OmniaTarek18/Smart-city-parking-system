package com.example.backend.DTOs;

public record PricingStrategyDTO(
                String spot_type,
                int parkingLot_id,
                double cost,
                double congestion_added_percent) {
}
