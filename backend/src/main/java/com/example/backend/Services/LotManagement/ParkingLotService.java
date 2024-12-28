package com.example.backend.Services.LotManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.ParkingLotDTO;
import com.example.backend.DTOs.ParkingSpotDTO;
import com.example.backend.Enums.SpotType;
import com.example.backend.Repositories.LotManagement.ParkingLotRepository;
import com.example.backend.Repositories.LotManagement.ParkingSpotRepository;
import com.example.backend.Enums.SpotStatus;

@Service
public class ParkingLotService {

    @Autowired
    private ParkingLotRepository parkingLotRepository;

    @Autowired
    private ParkingSpotRepository parkingSpotRepository;

    public List<ParkingLotDTO> getParkingLotsByOwnerId(int ownerId) {
        return parkingLotRepository.findByOwnerId(ownerId);
    }

    public int addParkingLot(ParkingLotDTO parkingLot) {
        int id = parkingLotRepository.save(parkingLot);
        createSpots(parkingLot, id);
        return id;
    }

    public void updateParkingLot(ParkingLotDTO parkingLot) {
        parkingLotRepository.update(parkingLot);
        updateSpots(parkingLot, parkingLot.capacity_regular(), SpotType.REGULAR);
        updateSpots(parkingLot, parkingLot.capacity_handicap(), SpotType.HANDICAP);
        updateSpots(parkingLot, parkingLot.capacity_ev(), SpotType.EV);
    }

    public void deleteParkingLot(int id) {
        parkingSpotRepository.deleteByParkingLotId(id);
        parkingLotRepository.delete(id);
    }

    private void createSpots(ParkingLotDTO parkingLot, int parkingLotId) {
        int currentMaxId = parkingSpotRepository.findMaxIdForLot(parkingLotId);
        currentMaxId++; // Start from the next available ID
        currentMaxId = createSpotsByType(parkingLotId, parkingLot.capacity_regular(), SpotType.REGULAR, currentMaxId);
        currentMaxId = createSpotsByType(parkingLotId, parkingLot.capacity_handicap(), SpotType.HANDICAP, currentMaxId);
        createSpotsByType(parkingLotId, parkingLot.capacity_ev(), SpotType.EV, currentMaxId);
    }

    private int createSpotsByType(int parkingLotId, int capacity, SpotType type, int startingId) {
        for (int i = 0; i < capacity; i++) {
            parkingSpotRepository.save(new ParkingSpotDTO(startingId++, parkingLotId, type, SpotStatus.AVAILABLE));
        }
        return startingId;
    }

    private void updateSpots(ParkingLotDTO parkingLot, int newCapacity, SpotType type) {
        int currentCapacity = parkingSpotRepository.countByTypeAndParkingLotId(type, parkingLot.id());
        int currentMaxId = parkingSpotRepository.findMaxIdForLot(parkingLot.id());

        if (newCapacity > currentCapacity) {
            for (int i = 0; i < (newCapacity - currentCapacity); i++) {
                parkingSpotRepository
                        .save(new ParkingSpotDTO(++currentMaxId, parkingLot.id(), type, SpotStatus.AVAILABLE));
            }
        } else if (newCapacity < currentCapacity) {
            parkingSpotRepository.deleteExcessSpots(parkingLot.id(), type, (currentCapacity - newCapacity));
        }
    }

    public ParkingLotDTO getParkingLotById(int id) {
        return parkingLotRepository.findById(id);
    }

    public double getOccupancyRate(int parkingLotId) {
        ParkingLotDTO lot = parkingLotRepository.findById(parkingLotId);
        int totalSpots = (lot == null) ? 0 : lot.capacity_regular() + lot.capacity_handicap() + lot.capacity_ev();

        if (totalSpots == 0) {
            return 0.0;
        }

        int occupiedSpots = parkingSpotRepository.countOccupiedSpots(parkingLotId, SpotType.REGULAR) +
                parkingSpotRepository.countOccupiedSpots(parkingLotId, SpotType.HANDICAP) +
                parkingSpotRepository.countOccupiedSpots(parkingLotId, SpotType.EV);

        return (double) occupiedSpots / totalSpots;
    }
    
}
