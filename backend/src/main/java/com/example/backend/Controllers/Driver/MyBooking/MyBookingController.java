package com.example.backend.Controllers.Driver.MyBooking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.Reservation;
import com.example.backend.Enums.ReservationStatus;
import com.example.backend.Services.ReservationService;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import java.time.Duration;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MyBookingController {

    private final ReservationService reservationService;

    @GetMapping(value = "/bookings/stream/{driver_id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<List<Reservation>> streamBookings(@PathVariable int driver_id, @RequestParam ReservationStatus status) {
        return Flux.interval(Duration.ofSeconds(5)) 
                   .map(sequence -> reservationService.getBookingsForUser(driver_id, status));
    }
}
