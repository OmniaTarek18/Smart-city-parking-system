package com.example.backend.Controllers.Admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.DTOs.LotManagerDTO;
import com.example.backend.DTOs.LotManagerSearchCriteriaDTO;
import com.example.backend.DTOs.ResponseLotManagerSearchDTO;
import com.example.backend.Services.LotManagerService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class LotManagerManagementController {
    
    private final LotManagerService lotManagerService;

    @PostMapping("/addLotManager")
    public ResponseEntity<String> addLotManager(@RequestBody LotManagerDTO lotManagerDTO) {
        lotManagerService.addLotManager(lotManagerDTO);
        return ResponseEntity.ok("Lot manager added successfully");
    }

    @PostMapping("/searchLotManagers")
    public ResponseEntity<List<ResponseLotManagerSearchDTO>> searchLotManagers(@RequestBody LotManagerSearchCriteriaDTO criteria) {
        List<ResponseLotManagerSearchDTO> lotManagers = lotManagerService.searchLotManagers(criteria);
        return ResponseEntity.ok(lotManagers);
    }
}
