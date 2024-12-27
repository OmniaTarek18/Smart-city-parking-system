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

    public void addParkingLot(ParkingLotDTO parkingLot) {
        parkingLotRepository.save(parkingLot);
        createSpots(parkingLot);
    }

    public void updateParkingLot(ParkingLotDTO parkingLot) {
        parkingLotRepository.update(parkingLot);
        // update spots for each type 
        updateSpots(parkingLot,parkingLot.capacity_regular(),SpotType.REGULAR);
        updateSpots(parkingLot,parkingLot.capacity_handicap(),SpotType.HANDICAP);
        updateSpots(parkingLot,parkingLot.capacity_ev(),SpotType.EV);
    }

    public void deleteParkingLot(int id) {
        parkingSpotRepository.deleteByParkingLotId(id);
        parkingLotRepository.delete(id);
    }

    private void createSpots(ParkingLotDTO parkingLot) {
        int currentMaxId = parkingSpotRepository.findMaxIdForLot(parkingLot.id());
        System.out.println(currentMaxId);
        currentMaxId++; // incrementing from the next available id
        currentMaxId = createSpotsByType(parkingLot.id(),parkingLot.capacity_regular(),SpotType.REGULAR,currentMaxId);
        currentMaxId = createSpotsByType(parkingLot.id(),parkingLot.capacity_handicap(),SpotType.HANDICAP,currentMaxId);
        createSpotsByType(parkingLot.id(),parkingLot.capacity_ev(),SpotType.EV,currentMaxId);
    }

    private int createSpotsByType(int parkingLotId, int capacity, SpotType type, int startingId) {
        for (int i = 0; i < capacity; i++) {
            parkingSpotRepository.save(new ParkingSpotDTO(startingId++,parkingLotId,type,SpotStatus.AVAILABLE));
        }
        return startingId; 
    }

    private void updateSpots(ParkingLotDTO parkingLot, int newCapacity, SpotType type) {
        int currentCapacity = parkingSpotRepository.countByTypeAndParkingLotId(type, parkingLot.id());
        int currentMaxId = parkingSpotRepository.findMaxIdForLot(parkingLot.id());

        if (newCapacity>currentCapacity) {
            for (int i = 0;i< (newCapacity-currentCapacity);i++) {
                parkingSpotRepository.save(new ParkingSpotDTO(++currentMaxId,parkingLot.id(),type,SpotStatus.AVAILABLE));
            }
        } else if (newCapacity<currentCapacity) {
            parkingSpotRepository.deleteExcessSpots(parkingLot.id(),type,(currentCapacity-newCapacity));
        }
    }
}
