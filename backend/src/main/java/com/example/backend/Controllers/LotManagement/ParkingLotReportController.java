// package com.example.backend.Controllers.LotManagement;

// import java.util.Date;
// import java.util.HashMap;
// import java.util.Map;

// import org.springframework.http.ContentDisposition;
// import org.springframework.http.HttpHeaders;
// import org.springframework.http.MediaType;
// import org.springframework.http.ResponseEntity;
// import org.springframework.stereotype.Controller;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;

// import com.example.backend.Services.LotManagement.ParkingLotService;
// import com.example.backend.Services.LotManagement.ReportService;

// import lombok.RequiredArgsConstructor;
// import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

// @CrossOrigin(origins = "*")
// @Controller
// @RequestMapping("/admin/reports")
// @RequiredArgsConstructor
// public class ParkingLotReportController {

//     private final ReportService reportService;
//     private final ParkingLotService parkingLotService;

//     @GetMapping("/parking-lot/{parkingLotId}")
//     public ResponseEntity<byte[]> generateParkingLotReport(@PathVariable int parkingLotId) {
//         try {

//             double occupancyRate = parkingLotService.getOccupancyRate(parkingLotId);

//             Map<String, Object> parameters = new HashMap<>();
//             parameters.put("ReportTitle", "Parking Lot Report");
//             parameters.put("Date", new Date());
//             parameters.put("OccupancyRate", occupancyRate);
//             parameters.put("ParkingLotId", parkingLotId);

  
//             byte[] pdfReport = reportService.generateReport(
//                     "/reports/parking_lot_report.jrxml", parameters, new JRBeanCollectionDataSource(null));

//             HttpHeaders headers = new HttpHeaders();
//             headers.setContentType(MediaType.APPLICATION_PDF);
//             headers.setContentDisposition(ContentDisposition.attachment().filename("parking_lot_report.pdf").build());

//             return ResponseEntity.ok().headers(headers).body(pdfReport);
//         } catch (Exception e) {
//             return ResponseEntity.status(500).body(null);
//         }
//     }
// }
