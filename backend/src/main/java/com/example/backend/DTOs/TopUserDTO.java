package com.example.backend.DTOs;

public record TopUserDTO(
        String firstName,
        String lastName,
        int totalRevenue,
        int violations,
        int score
)  {
    
}
