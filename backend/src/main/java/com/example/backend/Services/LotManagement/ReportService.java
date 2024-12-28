// package com.example.backend.Services.LotManagement;

// import java.io.InputStream;
// import java.util.Map;

// import org.springframework.stereotype.Service;

// import net.sf.jasperreports.engine.JasperCompileManager;
// import net.sf.jasperreports.engine.JasperExportManager;
// import net.sf.jasperreports.engine.JasperFillManager;
// import net.sf.jasperreports.engine.JasperPrint;
// import net.sf.jasperreports.engine.JasperReport;
// import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

// @Service
// public class ReportService {

//     public byte[] generateReport(String templatePath, Map<String, Object> parameters,
//             JRBeanCollectionDataSource dataSource) {
//         try {
//             InputStream reportStream = getClass().getResourceAsStream(templatePath);
//             JasperReport jasperReport = JasperCompileManager.compileReport(reportStream);
//             JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
//             return JasperExportManager.exportReportToPdf(jasperPrint);
//         } catch (Exception e) {
//             throw new RuntimeException("Error generating report", e);
//         }
//     }
// }
