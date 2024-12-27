package com.example.backend.Controllers.Registeration;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.example.backend.DTOs.SignupRequest;
import com.example.backend.Services.Registeration.SignupService;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class SignupController {
    private final SignupService signupService;

    @PostMapping("/signup")
    public ResponseEntity<Integer> signupDriver(@RequestBody SignupRequest signupRequest) {
        int id = signupService.signup(signupRequest);
        return ResponseEntity.ok(id);
    }
}
