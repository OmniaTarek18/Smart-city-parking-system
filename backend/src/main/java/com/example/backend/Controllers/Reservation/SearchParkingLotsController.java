package com.example.backend.Controllers.Reservation;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.Services.SearchParkingLotsService;

import lombok.RequiredArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.DTOs.ParkingLot;
import com.example.backend.DTOs.SearchParkingLotsDTO;

@RestController
@RequiredArgsConstructor
public class SearchParkingLotsController {
    private final SearchParkingLotsService searchParkingLotsService;

    @PostMapping("/lotLocations/{page}")
    public List<ParkingLot> getParkingLots(
            @PathVariable int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestBody SearchParkingLotsDTO searchParkingLotsDTO) {
        return searchParkingLotsService.getParkingLots(searchParkingLotsDTO, page, size);
    }
}
