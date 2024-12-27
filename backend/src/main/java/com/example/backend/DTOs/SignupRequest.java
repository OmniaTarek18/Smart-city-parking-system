package com.example.backend.DTOs;

import java.time.LocalDate;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record SignupRequest(
        @NotNull @NotEmpty String firstName,
        @NotNull @NotEmpty String lastName,
        @NotNull @NotEmpty @Email String email,
        @NotNull @NotEmpty String password,
        @NotNull @NotEmpty String phoneNumber,
        @NotNull @NotEmpty String licensePlate,
        @NotNull @NotEmpty String cvv,
        @NotNull @NotEmpty String cardNumber,
        @NotNull @NotEmpty LocalDate expirationDate,
        @NotNull @NotEmpty String cardHolderName) {

}
