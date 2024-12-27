package com.example.backend.Controllers.LotManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.ParkingLotDTO;
import com.example.backend.Services.LotManagement.ParkingLotService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/parking-lots")
public class ParkingLotController {

    @Autowired
    private ParkingLotService parkingLotService;

    @GetMapping("/owners/{ownerId}")
    public List<ParkingLotDTO> getParkingLotsByOwnerId(@PathVariable int ownerId) {
        return parkingLotService.getParkingLotsByOwnerId(ownerId);
    }

    @PostMapping
    public int addParkingLot(@RequestBody ParkingLotDTO parkingLot) {
        return parkingLotService.addParkingLot(parkingLot);
    }

    @PutMapping("/{id}")
    public void updateParkingLot(@PathVariable int id, @RequestBody ParkingLotDTO parkingLot) {
        parkingLotService.updateParkingLot(parkingLot);
    }

    @DeleteMapping("/{id}")
    public void deleteParkingLot(@PathVariable int id) {
        parkingLotService.deleteParkingLot(id);
    }

    @GetMapping("/{parkingLotId}/occupancy-rate")
    public double getOccupancyRate(@PathVariable int parkingLotId) {
        return parkingLotService.getOccupancyRate(parkingLotId);
    }
}
