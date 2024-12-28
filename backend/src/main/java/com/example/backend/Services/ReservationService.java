package com.example.backend.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.backend.DTOs.Reservation;
import com.example.backend.Enums.ReservationStatus;
import com.example.backend.Repositories.ReservationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReservationService {
    
    private final ReservationRepository reservationRepository;

    public List<Reservation> getBookingsForUser(int driver_id, ReservationStatus type){
        return reservationRepository.findReservationById(driver_id, type.toString());
    }
}
