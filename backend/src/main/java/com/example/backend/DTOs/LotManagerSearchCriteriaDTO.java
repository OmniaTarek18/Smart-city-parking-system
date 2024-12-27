package com.example.backend.DTOs;

public record LotManagerSearchCriteriaDTO(
    String firstName,
    String lastName,
    String email,
    String phone,
    int pageNum,
    int pageSize
) {
    
}
