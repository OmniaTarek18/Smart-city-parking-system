package com.example.backend.Services.LotManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.ParkingSpotDTO;
import com.example.backend.Repositories.LotManagement.ParkingSpotRepository;

@Service
public class ParkingSpotService {

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    public List<ParkingSpotDTO> getParkingSpotsByParkingLotId(int parkingLotId) {
        return parkingSpotRepository.findByParkingLotId(parkingLotId);
    }

    public void updateParkingSpot(int parkingLotId, int spotId, ParkingSpotDTO parkingSpot) {
        parkingSpotRepository.updateByLotAndSpotId(parkingSpot, parkingLotId, spotId);
    }

}
