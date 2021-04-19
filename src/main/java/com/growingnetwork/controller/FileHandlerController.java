package com.growingnetwork.controller;

import com.growingnetwork.dto.image.ImageDtoOut;
import com.growingnetwork.mapper.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/storage")
public class FileHandlerController {
    
    private final ImageMapper imageMapper;
    
    @Autowired
    public FileHandlerController(ImageMapper imageMapper) {
        this.imageMapper = imageMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<ImageDtoOut>> getAllFiles() {
        return ResponseEntity.ok(imageMapper.getAll());
    }
    
    @PostMapping("/upload")
    public ResponseEntity<ImageDtoOut> uploadFile(@RequestPart(value = "file") MultipartFile file) {
        return ResponseEntity.ok(imageMapper.upload(file));
    }
    
    @DeleteMapping("/delete/{fileId}")
    public ResponseEntity<ImageDtoOut> deleteFile(@PathVariable(value = "fileId") Long fileId) {
        return ResponseEntity.ok(imageMapper.delete(fileId));
    }
    
}
