package com.example.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.TopUserDTO;
import com.example.backend.DTOs.WorstDriverDTO;
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

    public List<TopUserDTO> getTopDrivers(Integer pageSize, Integer pageNum) {
        return userRepository.getTopDrivers(pageSize, pageNum);
    }

    public List<WorstDriverDTO> getWorstDrivers(int pageSize, int pageNum) {
        return userRepository.getWorstDrivers(pageSize, pageNum);
    }
}
