package com.example.backend.DTOs;

public record WorstDriverDTO(
    String email,
    String firstName,
    String lastName,
    String phone,
    int totalViolations,
    int faultySpotsCount,
    int score
) {
    
}
