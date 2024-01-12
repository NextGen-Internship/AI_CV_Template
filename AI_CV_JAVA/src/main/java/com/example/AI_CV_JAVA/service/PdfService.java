package com.example.AI_CV_JAVA.service;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import org.apache.pdfbox.pdmodel.PDDocument;
@Service
@RequiredArgsConstructor
public class PdfService {
    private final PdfPublisherService producer;

    public void makeJson(String message) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(message);
            String keyValue = jsonNode.get("name").asText();
            String fooValue = jsonNode.get("age").asText();
            JsonNode skillsNode = jsonNode.get("skills");

            String[] skillsArray = objectMapper.treeToValue(skillsNode, String[].class);
            System.out.println("Key: " + keyValue);
            System.out.println("Foo: " + fooValue);
            System.out.print("Skills: ");
            for (String skill : skillsArray) {
                System.out.print(skill + " ");
            }
            makePdf();
            System.out.println(jsonNode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


        public void makePdf(){
            try {
                PDDocument document = new PDDocument();

                PDPage page = new PDPage();
                document.addPage(page);
                float pageWidth = page.getMediaBox().getWidth();
                float pageHeight = page.getMediaBox().getUpperRightX();

                System.out.println(page.getMediaBox().getUpperRightX());
                System.out.println(page.getMediaBox().getUpperRightY());
                System.out.println(page.getMediaBox().getLowerLeftX());
                System.out.println(page.getMediaBox().getLowerLeftY());



                PDPageContentStream contentStream = new PDPageContentStream(document, page);

                contentStream.setFont(PDType1Font.HELVETICA_BOLD, 12);

                contentStream.beginText();
                contentStream.newLineAtOffset(10,700); // Set the position
                contentStream.showText("Name:");
                contentStream.endText();

                contentStream.close();

                document.save("output.pdf");

                document.close();

                System.out.println("PDF created successfully.");

            } catch (IOException e) {
                e.printStackTrace();
            }
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

