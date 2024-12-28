package com.example.backend.DTOs;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TopLotDTO {
    private String lotName;
    private int occupancyRate;
    private int totalRevenue;
    private int violations;
    private int score;
}
