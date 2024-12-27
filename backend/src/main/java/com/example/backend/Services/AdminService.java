package com.example.backend.Services;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.AdminDTO;
import com.example.backend.DTOs.AdminSearchCriteria;
import com.example.backend.Enums.Role;
import com.example.backend.Enums.UserStatus;
import com.example.backend.Repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void addAdmin(AdminDTO adminDTO) {
        int rowsAffected = userRepository.insertUserIfNotExists(adminDTO.email(),
                passwordEncoder.encode(adminDTO.password()), Role.SystemAdmin, UserStatus.ACTIVE);
        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Email already exists");
        }
    }

    public void deleteAdmin(String email) {
        int rowsAffected = userRepository.deleteAdminIfMoreThanOne(email);
        if (rowsAffected == 0) {
            throw new IllegalArgumentException("Unable to delete admin: ensure its existence and the presence of other admins.");
        }
    }

    public List<String> getAdmins(AdminSearchCriteria searchCriteria) {
        return userRepository.getAdmins(searchCriteria.email(), searchCriteria.pageSize(), searchCriteria.pageNum());
    }
}
