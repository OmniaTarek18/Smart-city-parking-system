package com.example.backend.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.ReservationRulesDTO;
import com.example.backend.Repositories.ReservationRulesRepository;

@Service
public class ReservationRulesService {

    private final ReservationRulesRepository reservationRulesRepository;

    @Autowired
    public ReservationRulesService(ReservationRulesRepository reservationRulesRepository) {
        this.reservationRulesRepository = reservationRulesRepository;
    }
    public ReservationRulesDTO getRuleByLotManagerId(Integer lotManagerId) {
        return reservationRulesRepository.findByLotManagerId(lotManagerId);
    }

    public void saveRule(ReservationRulesDTO dto) {
        reservationRulesRepository.save(dto);
    }

    public void deleteRuleByLotManagerId(Integer lotManagerId) {
        reservationRulesRepository.deleteByLotManagerId(lotManagerId);
    }
}
