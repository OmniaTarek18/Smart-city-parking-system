package com.example.backend.Controllers.GoogleMap;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.Point;
import com.example.backend.Services.LocationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class LocationController {

    private final LocationService locationService;

    @GetMapping("lotLocation/{lotId}/coordinates")
    public Point googleMapController(@PathVariable int lotId) {
        return locationService.getCoordinatesById(lotId);
    }
}
