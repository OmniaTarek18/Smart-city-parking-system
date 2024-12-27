package com.example.backend.DTOs;

public record WorstDriverDTO(
    String email,
    String name,
    String phone,
    int totalViolations,
    int faultySpotsCount,
    int score
) {
    
}
