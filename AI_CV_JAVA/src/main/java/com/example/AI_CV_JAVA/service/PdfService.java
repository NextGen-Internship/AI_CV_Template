package com.example.AI_CV_JAVA.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.apache.pdfbox.pdmodel.PDDocument;
@Service
@RequiredArgsConstructor
public class PdfService {
    private final PdfPublisherService producer;

    public JsonNode makeJson(String message) throws JsonProcessingException {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.readTree(message);
    }


        public void readJson(String message) throws JsonProcessingException {
        JsonNode jsonNode = makeJson(message);
        }



    public void upload(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        producer.sendMessage(text);
        document.close();

    }
}

