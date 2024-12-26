package com.example.backend.Controllers.Admin;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.DTOs.LotManagerDTO;
import com.example.backend.Services.LotManagerService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class LotManagerManagementController {
    
    private final LotManagerService lotManagerService;

    @PostMapping("/addLotManager")
    public ResponseEntity<String> addLotManager(@RequestBody LotManagerDTO lotManagerDTO) {
        lotManagerService.addLotManager(lotManagerDTO);
        return ResponseEntity.ok("Lot manager added successfully");
    }

}
