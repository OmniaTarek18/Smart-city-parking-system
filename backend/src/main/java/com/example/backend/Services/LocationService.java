package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.Point;
import com.example.backend.Repositories.LocationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {
    private final LocationRepository locationRepository;

    public Point getCoordinatesById(int lotId) {
        return locationRepository.findCoordinatesById(lotId);
    }
}
