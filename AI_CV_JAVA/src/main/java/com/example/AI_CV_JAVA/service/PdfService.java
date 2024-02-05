package com.example.AI_CV_JAVA.service;

import com.example.AI_CV_JAVA.DTO.EducationDto;
import com.example.AI_CV_JAVA.DTO.ExperienceDto;
import com.example.AI_CV_JAVA.DTO.PersonDto;
import com.example.AI_CV_JAVA.DTO.TechnologyDto;
import com.example.AI_CV_JAVA.controller.WebSocketController;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class PdfService {
    private final PdfPublisherService producer;
    private final WebSocketController webSocketController;

    private static List<ExperienceDto> mapExperiences(JsonNode experiencesNode) {
        List<ExperienceDto> experiences = new ArrayList<>();
        for (JsonNode experienceNode : experiencesNode) {
            ExperienceDto experienceDto = new ExperienceDto();
            experienceDto.setCompanyName(experienceNode.path("company").asText());
            experienceDto.setRole(experienceNode.path("role").asText());
            experienceDto.setStartYear(experienceNode.path("start_year").asText());
            if (experienceNode.path("end_year").isNull()) {
                experienceDto.setEndYear("Present");
            } else {
                experienceDto.setEndYear(experienceNode.path("end_year").asText());
            }
            experienceDto.setDescription(experienceNode.path("description").asText());
            experiences.add(experienceDto);
        }
        return experiences;
    }
    public PersonDto makePerson(String jsonMessage) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonMessage);
        PersonDto personDto = new PersonDto();
        personDto.setName(jsonNode.path("name").asText());
        personDto.setSummary(jsonNode.path("summary").asText());
        personDto.setTechnologies(mapTechnologies(jsonNode.path("technologies")));
        personDto.setExperience(mapExperiences(jsonNode.path("experience")));
        personDto.setEducation(mapEducation(jsonNode.path("education")));
        return personDto;
    }
    private List<EducationDto> mapEducation(JsonNode education) {
        List<EducationDto> educationDto = new ArrayList<>();
        for (JsonNode jsonNode : education) {
            EducationDto educationDto1 = new EducationDto();
            educationDto1.setDegree(jsonNode.path("degree").asText());
            educationDto1.setCollage(jsonNode.path("college").asText());
            educationDto1.setStartYear(jsonNode.path("start_year").asText());
            educationDto1.setEndYear(jsonNode.path("end_year").asText());
            educationDto.add(educationDto1);
        }
        return educationDto;
    }
    private List<TechnologyDto> mapTechnologies(JsonNode technologiesNode) {
        List<TechnologyDto> technologies = new ArrayList<>();
        for (JsonNode technologyNode : technologiesNode) {
            TechnologyDto technologyDto = new TechnologyDto();
            technologyDto.setName(technologyNode.asText());
            technologies.add(technologyDto);
        }
        return technologies;
    }
    public void readJson(String message) throws Exception {
        PersonDto personDto = makePerson(message);
        webSocketController.sendMessage("message");
    }
    public CompletableFuture<PersonDto> upload(MultipartFile file) throws IOException {
        PDDocument document = PDDocument.load(file.getInputStream());
        PDFTextStripper pdfStripper = new PDFTextStripper();
        String text = pdfStripper.getText(document);
        document.close();
        CompletableFuture<PersonDto> result = new CompletableFuture<>();
        producer.sendMessage(text);
        return result;
    }

}