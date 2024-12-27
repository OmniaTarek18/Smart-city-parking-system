package com.example.backend.Controllers.Registeration;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.DTOs.LoginRequest;
import com.example.backend.Services.LoginService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LoginController {
    private final LoginService loginService;

    @PostMapping("/login")
    public ResponseEntity<Integer> loginDriver(@RequestBody LoginRequest loginRequest) {
        Integer id = loginService.login(loginRequest);
        return ResponseEntity.ok(id);
    }
}
