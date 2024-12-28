package com.example.backend.Controllers.Admin;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.backend.DTOs.TopLotDTO;
import com.example.backend.DTOs.TopUserDTO;
import com.example.backend.Services.DriverService;
import com.example.backend.Services.ParkingLotService;
import com.example.backend.Services.ReportService;

import lombok.RequiredArgsConstructor;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Controller
@RequestMapping("/admin/reports")
@RequiredArgsConstructor
public class ReportsController {

    private final ReportService reportService;
    private final DriverService driverService;
    private final ParkingLotService parkingLotService;

    @GetMapping("/top-users")
    public ResponseEntity<byte[]> generateTopUsersReport() {
        List<TopUserDTO> topUsers = driverService.getTopDrivers(30, 1);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(topUsers);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ReportTitle", "Top Users Report");
        parameters.put("Date", new Date());

        byte[] pdfReport = reportService.generateReport(
                "/reports/top_users_report.jrxml", parameters, dataSource);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("top_users_report.pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfReport);
    }

    @GetMapping("/top-parking-lots")
    public ResponseEntity<byte[]> generateTopParkingLotsReport() {
        List<TopLotDTO> topLots = parkingLotService.getTopLots(30, 1);
        JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(topLots);

        Map<String, Object> parameters = new HashMap<>();
        parameters.put("ReportTitle", "Top Parking Lots Report");
        parameters.put("Date", new Date());

        byte[] pdfReport = reportService.generateReport(
                "/reports/top_parking_lots_report.jrxml", parameters, dataSource);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.attachment().filename("top_parking_lots_report.pdf").build());

        return ResponseEntity.ok().headers(headers).body(pdfReport);
    }
}

