package com.example.backend.Controllers.LotManagement;
import com.example.backend.DTOs.PricingStrategyDTO;
import com.example.backend.Services.LotManagement.PricingStrategyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/pricing-strategy")
public class PricingStrategyController {

    private final PricingStrategyService pricingStrategyService;

    @Autowired
    public PricingStrategyController(PricingStrategyService pricingStrategyService) {
        this.pricingStrategyService = pricingStrategyService;
    }

    @GetMapping("/{parkingLotId}/{spotType}")
    public ResponseEntity<PricingStrategyDTO> getPricingStrategy(@PathVariable int parkingLotId,
            @PathVariable String spotType) {
        PricingStrategyDTO pricingStrategy = pricingStrategyService.getPricingStrategy(parkingLotId, spotType);
        return ResponseEntity.ok(pricingStrategy);
    }

    @PostMapping
    public ResponseEntity<Void> createOrUpdatePricingStrategy(@RequestBody PricingStrategyDTO pricingStrategy) {
        pricingStrategyService.savePricingStrategy(pricingStrategy);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{parkingLotId}/{spotType}")
    public ResponseEntity<Void> deletePricingStrategy(@PathVariable int parkingLotId, @PathVariable String spotType) {
        pricingStrategyService.deletePricingStrategy(parkingLotId, spotType);
        return ResponseEntity.noContent().build();
    }
}
