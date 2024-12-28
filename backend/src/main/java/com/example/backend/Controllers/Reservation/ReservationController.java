package com.example.backend.Controllers.Reservation;

import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.ReservationDTO;
import com.example.backend.Services.ReservationService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
public class ReservationController {
    private final ReservationService reservationService;

    @PostMapping("make-reservation/{userId}")
    public ResponseEntity<Integer> reserve(@PathVariable int userId, @RequestBody ReservationDTO body) {
        int reservationId = reservationService.createReservation(userId, body);
        return ResponseEntity.ok(reservationId);
    }

}
