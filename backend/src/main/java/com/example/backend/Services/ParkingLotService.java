package com.example.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.TopLotDTO;
import com.example.backend.Repositories.ParkingLotRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ParkingLotService {
    
    private final ParkingLotRepository parkingLotRepository;

    public List<TopLotDTO> getTopLots(int pageSize, int pageNum) {
        return parkingLotRepository.getTopLots(pageSize, pageNum);
    }
}
