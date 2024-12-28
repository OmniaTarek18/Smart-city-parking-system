package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.Repositories.SpotRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpotService {
    private final SpotRepository spotRepository;
    public void update(int id, int parkingLotId, String status){
        spotRepository.update(id, parkingLotId, status);
    }
}   
