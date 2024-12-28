package com.example.backend.Controllers.LotManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.DTOs.ReservationRulesDTO;
import com.example.backend.Services.ReservationRulesService;

@RestController
@RequestMapping("/reservation-rules")
public class ReservationRulesController {

    private final ReservationRulesService reservationRulesService;

    @Autowired
    public ReservationRulesController(ReservationRulesService reservationRulesService) {
        this.reservationRulesService = reservationRulesService;
    }

    @GetMapping("/{lotManagerId}")
    public ReservationRulesDTO getRuleByLotManagerId(@PathVariable Integer lotManagerId) {
        return reservationRulesService.getRuleByLotManagerId(lotManagerId);
    }

    @PostMapping
    public void saveRule(@RequestBody ReservationRulesDTO dto) {
        reservationRulesService.saveRule(dto);
    }

    @DeleteMapping("/{lotManagerId}")
    public void deleteRule(@PathVariable Integer lotManagerId) {
        reservationRulesService.deleteRuleByLotManagerId(lotManagerId);
    }
}
