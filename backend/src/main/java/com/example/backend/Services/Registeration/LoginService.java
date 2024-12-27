package com.example.backend.Services.Registeration;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.LoginRequest;
import com.example.backend.Enums.Role;
import com.example.backend.Repositories.DriverRepository;
import com.example.backend.Repositories.LotManagerRepository;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final LotManagerRepository lotManagerRepository;
    private final DriverRepository driverRepository;

    public int login(LoginRequest loginRequest) {
        int userId = userRepository.findUserByEmailAndPassword(
                loginRequest.email(),
                loginRequest.password());

        if (loginRequest.role() == Role.Driver)
            return driverRepository.findDriverByUserId(userId);
        else if (loginRequest.role() == Role.LotManager)
            return lotManagerRepository.findLotManagerByUserId(userId);
        else if (loginRequest.role() == Role.SystemAdmin)
            return userId;
        else
            throw new IllegalArgumentException("Role is not found");

    }
}