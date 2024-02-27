package com.example.AI_CV_JAVA.service.interfaces;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;

public interface StorageService {
    public URL generatePresignedUrl(String key);
    public URL uploadFile(MultipartFile file) throws IOException;

}
