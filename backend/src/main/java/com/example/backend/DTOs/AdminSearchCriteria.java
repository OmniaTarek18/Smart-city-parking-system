package com.example.backend.DTOs;

public record AdminSearchCriteria(
    String email,
    int pageNum,
    int pageSize
) {
    
}
