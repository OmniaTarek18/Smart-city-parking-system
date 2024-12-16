package com.example.backend.Controllers.Registeration;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.backend.DTOs.LoginRequest;
import com.example.backend.Services.LoginService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping("/driver")
    public ResponseEntity<Integer> loginDriver(@RequestBody LoginRequest loginRequest) {
        Integer id = loginService.login(loginRequest, "driver");
        return ResponseEntity.ok(id);
    }

    @PostMapping("/system-admin")
    public ResponseEntity<Integer> loginSystemAdmin(@RequestBody LoginRequest loginRequest) {
        Integer id = loginService.login(loginRequest, "system_admin");
        return ResponseEntity.ok(id);

    }

    @PostMapping("/parking-lot-admin")
    public ResponseEntity<Integer> loginParkingLotAdmin(@RequestBody LoginRequest loginRequest) {
        Integer id = loginService.login(loginRequest, "parking_lot_admin");
        return ResponseEntity.ok(id);
    }
}
