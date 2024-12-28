package com.example.backend.DTOs;

import com.example.backend.Enums.PenaltyStatus;

public record PenalityRulesDTO(
        PenaltyStatus penality_type, 
        int LotManager_id,
        Double cost,
        String time 
) {
}
