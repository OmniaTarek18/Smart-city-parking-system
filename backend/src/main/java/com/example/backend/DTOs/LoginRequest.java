package com.example.backend.DTOs;

import com.example.backend.Enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record LoginRequest(
        @NotEmpty @NotNull @Email String email,
        @NotEmpty @NotNull String password,
        @NotEmpty @NotNull Role role) {
}
