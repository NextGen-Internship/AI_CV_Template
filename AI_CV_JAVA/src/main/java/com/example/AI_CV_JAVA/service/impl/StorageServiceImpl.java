package com.example.AI_CV_JAVA.service.impl;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.AI_CV_JAVA.service.interfaces.StorageService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Date;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class StorageServiceImpl implements StorageService {

    private static final String FOLDER_NAME = "Hidden_Resources/";

    @Value("${application.bucket.name}")
    private  String bucketName;

    private final AmazonS3 s3Client;

    @Override
    public URL uploadFile(MultipartFile file) throws IOException {
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = FOLDER_NAME + System.currentTimeMillis();
        System.out.println("BUCKETTTT NAMEEEE: " + bucketName);
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        fileObj.delete();

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, fileName)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 3600000));

        return s3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }
    @Override
    public URL generatePresignedUrl(String key) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucketName, key)
                        .withMethod(HttpMethod.GET)
                        .withExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 3600000));

        return s3Client.generatePresignedUrl(generatePresignedUrlRequest);
    }
    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new IOException("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }
}
