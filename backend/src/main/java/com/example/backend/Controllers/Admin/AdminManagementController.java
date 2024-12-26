package com.example.backend.Controllers.Admin;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.backend.DTOs.AdminDTO;
import com.example.backend.Services.AdminService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminManagementController {

    private final AdminService adminService;

    @PostMapping("/addAdmin")
    public ResponseEntity<String> addAdmin(@RequestBody AdminDTO userDTO) {
        adminService.addAdmin(userDTO);
        return ResponseEntity.ok("Admin added successfully");
    }

    @DeleteMapping("/deleteAdmin")
    public ResponseEntity<String> deleteAdmin(@RequestParam Integer id) {
        adminService.deleteAdmin(id);
        return ResponseEntity.ok("Admin deleted successfully");
    }
}
