package com.example.backend.Controllers.LotManagement;

import com.example.backend.DTOs.PenalityRulesDTO;
import com.example.backend.Enums.PenaltyStatus;
import com.example.backend.Services.LotManagement.PenalityRulesService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/penalityRules")
public class PenalityRulesController {

    @Autowired
    private PenalityRulesService service;

    @PostMapping
    public ResponseEntity<String> addPenalityRule(@RequestBody PenalityRulesDTO dto) {
        service.addPenalityRule(dto);
        return ResponseEntity.ok("Penality Rule added successfully.");
    }

    @GetMapping("/{lotManagerId}")
    public ResponseEntity<List<PenalityRulesDTO>> getPenalityRulesByManagerId(@PathVariable int lotManagerId) {
        return ResponseEntity.ok(service.getPenalityRulesByManagerId(lotManagerId));
    }
}
