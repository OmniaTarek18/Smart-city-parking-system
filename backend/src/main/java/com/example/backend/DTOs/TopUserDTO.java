package com.example.backend.DTOs;

public record TopUserDTO(
        String name,
        int totalRevenue,
        int violations,
        int score
)  {
    
}
