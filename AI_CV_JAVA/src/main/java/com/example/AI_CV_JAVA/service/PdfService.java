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


        public void makePdf(String message){
            try {
                File inputFile = new File("Resume - Gallery.pdf");
                File outputFile = new File("output.pdf");
                JsonNode param = makeJson(message);
                String searchText = "Motivated self-starter with over a decade of solid development experience designing innovative and detailed solutions. Quickly adaptable to changing technologies and business requirements with an entrepreneurial initiative and drive.";
                String replacementText = param.asText("summary"); ;

                replaceTextInPDF(inputFile, outputFile, searchText, replacementText);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
//            try {
//                PDDocument document = new PDDocument();
//
//                PDPage page = new PDPage();
//                document.addPage(page);
//                JsonNode param = makeJson(message);
//
//                PDPageContentStream contentStream = new PDPageContentStream(document, page);
//                String content = contentStream.getString();

//                if (content.contains("")) {
//                    content = content.replace(searchText, replacementText);
//                    contentStream.clear();
//                    contentStream.writeBytes(content.getBytes());
//                }

//                contentStream.beginText();
//                contentStream.newLineAtOffset(10,700); // Set the position
//                contentStream.showText("Name:");
//                contentStream.endText();
//
//                contentStream.close();
//
//                document.save("output.pdf");
//
//                document.close();
//
//                System.out.println("PDF created successfully.");

//            } catch (IOException e) {
//                e.printStackTrace();
//            }
        }



    public void upload(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());

        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        System.out.println(text);
        producer.sendMessage(text);
        document.close();

    }
}

