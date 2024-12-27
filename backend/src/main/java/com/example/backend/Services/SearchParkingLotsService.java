package com.example.backend.Services;

import java.util.List;

import org.springframework.stereotype.Service;
import com.example.backend.DTOs.ParkingLot;
import com.example.backend.DTOs.SearchParkingLotsDTO;
import com.example.backend.Repositories.SearchParkingLotsRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchParkingLotsService {
    private final SearchParkingLotsRepository searchParkingLotsRepository;

    public List<ParkingLot> getParkingLots(SearchParkingLotsDTO searchParkingLotsDTO, int page, int size) {
        return searchParkingLotsRepository.findParkingLots(searchParkingLotsDTO, page, size);
    }
}
