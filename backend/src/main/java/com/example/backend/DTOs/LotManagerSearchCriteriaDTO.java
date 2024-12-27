package com.example.backend.DTOs;

public record LotManagerSearchCriteriaDTO(
    String name,
    String email,
    String phone,
    int pageNum,
    int pageSize
) {
    
}
