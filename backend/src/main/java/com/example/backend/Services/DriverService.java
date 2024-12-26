package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.Enums.Role;
import com.example.backend.Enums.UserStatus;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DriverService {
    
    private final UserRepository userRepository;

    public void blockDriver(String email) {
        int rowsAffected = userRepository.updateStatusIfExists(email, Role.Driver, UserStatus.BLOCKED);
        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Email not found");
        }
    }
}
