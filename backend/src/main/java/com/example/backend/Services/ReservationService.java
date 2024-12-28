package com.example.backend.Services;

import org.springframework.stereotype.Service;

import com.example.backend.DTOs.ReservationDTO;
import com.example.backend.Repositories.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
    private final ReservationRepository reservationRepository;

    public int createReservation(int userId, ReservationDTO body){
        return reservationRepository.createReservation(userId, body);
    }
}
