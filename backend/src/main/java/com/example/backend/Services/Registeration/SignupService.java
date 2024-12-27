package com.example.backend.Services.Registeration;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.SignupRequest;
import com.example.backend.Enums.Role;
import com.example.backend.Repositories.DriverRepository;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SignupService {
    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    public int signup(SignupRequest signupRequest) {
        
        int userId = userRepository.addUser(signupRequest.email(), signupRequest.password(), Role.Driver);
        int driverId = driverRepository.addDriver(signupRequest.firstName(), signupRequest.lastName(),
                signupRequest.phoneNumber(), signupRequest.cardHolderName(), signupRequest.cvv(),
                signupRequest.expirationDate(),signupRequest.cardNumber(), signupRequest.licensePlate(), userId);

        return driverId;
    }
}
