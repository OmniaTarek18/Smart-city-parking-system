package com.example.backend.Controllers.Admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.DTOs.TopLotDTO;
import com.example.backend.DTOs.TopUserDTO;
import com.example.backend.Services.DriverService;
import com.example.backend.Services.ParkingLotService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/insights")
@CrossOrigin(origins = "http://localhost:3000")
public class InsightsController {

    private final ParkingLotService parkingLotService;
    private final DriverService driverService;

    @GetMapping("/top-users")
    public ResponseEntity<List<TopUserDTO>> getTopDrivers(@RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "1") int pageNum) {
        return ResponseEntity.ok(driverService.getTopDrivers(pageSize, pageNum));
    }

    @GetMapping("/top-parking-lots")
    public ResponseEntity<List<TopLotDTO>> getTopParkingLots(@RequestParam int pageSize, @RequestParam int pageNum) {
        return ResponseEntity.ok(parkingLotService.getTopLots(pageSize, pageNum));
    }
}
