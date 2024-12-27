package com.example.backend.Controllers.Admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.DTOs.WorstDriverDTO;
import com.example.backend.Services.DriverService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class DriverManagementController {
    
    private final DriverService driverService;

    @GetMapping("/blockDriver")
    public ResponseEntity<String> blockDriver(@RequestParam String email) {
        driverService.blockDriver(email);
        return ResponseEntity.ok("Driver blocked successfully");
    }

    @GetMapping("/getWorstDrivers")
    public ResponseEntity<List<WorstDriverDTO>> getWorstDrivers(@RequestParam int pageSize, @RequestParam int pageNum) {
        return ResponseEntity.ok(driverService.getWorstDrivers(pageSize, pageNum));
    }
}
