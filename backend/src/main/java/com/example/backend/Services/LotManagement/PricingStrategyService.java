package com.example.backend.Services.LotManagement;

import com.example.backend.DTOs.PricingStrategyDTO;
import com.example.backend.Repositories.LotManagement.PricingStrategyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class PricingStrategyService {

    private final PricingStrategyRepository pricingStrategyRepository;

    @Autowired
    public PricingStrategyService(PricingStrategyRepository pricingStrategyRepository) {
        this.pricingStrategyRepository = pricingStrategyRepository;
    }

    public PricingStrategyDTO getPricingStrategy(int parkingLotId, String spotType) {
        return pricingStrategyRepository.findByParkingLotIdAndSpotType(parkingLotId, spotType);
    }

    public void savePricingStrategy(PricingStrategyDTO pricingStrategy) {
        pricingStrategyRepository.save(pricingStrategy);
    }

    public void deletePricingStrategy(int parkingLotId, String spotType) {
        pricingStrategyRepository.delete(parkingLotId, spotType);
    }
}
