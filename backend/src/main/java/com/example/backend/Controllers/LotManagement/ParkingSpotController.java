package com.example.backend.Controllers.LotManagement;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.ParkingSpotDTO;
import com.example.backend.Services.LotManagement.ParkingSpotService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/parking-spots")
public class ParkingSpotController {
    @Autowired
    private ParkingSpotService parkingSpotService;

    @GetMapping("/parking-lots/{parkingLotId}")
    public List<ParkingSpotDTO> getParkingSpotsByParkingLotId(@PathVariable int parkingLotId) {
        return parkingSpotService.getParkingSpotsByParkingLotId(parkingLotId);
    }

    @PutMapping("/parking-lots/{parkingLotId}/spots/{spotId}")
    public void updateParkingSpot(
            @PathVariable int parkingLotId, 
            @PathVariable int spotId, 
            @RequestBody ParkingSpotDTO parkingSpot) {
        parkingSpotService.updateParkingSpot(parkingLotId, spotId, parkingSpot);
    }
}
