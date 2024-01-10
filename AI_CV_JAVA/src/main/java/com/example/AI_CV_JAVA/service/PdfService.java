package com.example.AI_CV_JAVA.service;


import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.apache.pdfbox.pdmodel.PDDocument;
@Service
@RequiredArgsConstructor
public class PdfService {
    private final PdfPublisherService producer;





    public void upload(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());

        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        System.out.println(text);
        producer.sendMessage(text);
        document.close();
//        byte[] arr = file.getBytes();
//        producer.sendMessage(arr);
    }

}
