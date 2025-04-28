package com.example.excelexport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/excel")
public class ExcelController {

    private static final Logger logger = LoggerFactory.getLogger(ExcelController.class);

    @Autowired
    private ExcelService excelService;

    @Autowired
    private PDFService pdfService;

    @PostMapping("/download")
    public ResponseEntity<InputStreamResource> downloadExcel(@RequestBody Map<String, Object> requestData) throws IOException {
        logger.info("Excel ve PDF indirme isteği alındı.");

        Map<String, Object> vehicleInfo = (Map<String, Object>) requestData.get("vehicleInfo");
        List<Map<String, Object>> data = (List<Map<String, Object>>) requestData.get("data");
        String notes = (String) requestData.get("notes");

        // Önce Excel oluştur
        ByteArrayInputStream excelIn = excelService.exportExcel(vehicleInfo, data, notes);
        HttpHeaders excelHeaders = new HttpHeaders();
        excelHeaders.add("Content-Disposition", "attachment; filename=syoto.xlsx");

        // Sonra PDF oluştur
        ByteArrayInputStream pdfIn = pdfService.exportPDF(vehicleInfo, data, notes);
        HttpHeaders pdfHeaders = new HttpHeaders();
        pdfHeaders.add("Content-Disposition", "attachment; filename=syoto.pdf");

        logger.info("Excel ve PDF dosyaları indirme için hazırlandı.");

        // Önce Excel'i döndür
        return ResponseEntity
                .ok()
                .headers(excelHeaders)
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(excelIn));
    }

    @PostMapping("/download-pdf")
    public ResponseEntity<InputStreamResource> downloadPDF(@RequestBody Map<String, Object> requestData) throws IOException {
        logger.info("PDF indirme isteği alındı.");

        Map<String, Object> vehicleInfo = (Map<String, Object>) requestData.get("vehicleInfo");
        List<Map<String, Object>> data = (List<Map<String, Object>>) requestData.get("data");
        String notes = (String) requestData.get("notes");

        ByteArrayInputStream in = pdfService.exportPDF(vehicleInfo, data, notes);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=syoto.pdf");

        logger.info("PDF dosyası indirme için hazırlandı.");
        return ResponseEntity
                .ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(in));
    }
}
