package com.example.backend.DTOs;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class TopUserDTO  {
        private String firstName;
        private String lastName;
        private int totalRevenue;
        private int violations;
        private int score;
}
