package com.example.backend.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.Services.SpotService;


@Controller
@RequiredArgsConstructor
public class SpotController {
    private final SpotService spotService;
    @GetMapping("update/spot/{id}/{parkingLotId}")
    public ResponseEntity<Void> getMethodName(@PathVariable int id, @PathVariable int parkingLotId, @RequestParam String status) {
        spotService.update(id, parkingLotId, status);
        return ResponseEntity.ok().build();
    }
    
}
