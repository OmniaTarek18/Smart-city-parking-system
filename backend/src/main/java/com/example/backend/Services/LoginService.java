package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.LoginRequest;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;

    public Integer login(LoginRequest loginRequest) {
        return userRepository.findUserByEmailAndPassword(
                loginRequest.email(),
                loginRequest.password(),
                loginRequest.type());
    }
}