package com.example.backend.Services.LotManagement;

import com.example.backend.DTOs.PenalityRulesDTO;
import com.example.backend.Enums.PenaltyStatus;
import com.example.backend.Repositories.LotManagement.PenalityRulesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PenalityRulesService {

    @Autowired
    private PenalityRulesRepository repository;

    public int addPenalityRule(PenalityRulesDTO dto) {
        return repository.addPenalityRule(dto);
    }

    public List<PenalityRulesDTO> getPenalityRulesByManagerId(int lotManagerId) {
        return repository.getPenalityRulesByManagerId(lotManagerId);
    }

}
