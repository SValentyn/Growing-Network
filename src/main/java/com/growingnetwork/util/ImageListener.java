package com.growingnetwork.util;

import com.growingnetwork.exception.NonExistDataException;
import com.growingnetwork.exception.UploadDataException;
import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.Image;
import com.growingnetwork.service.AmazonService;
import com.growingnetwork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;

@Component
public class ImageListener {
    
    private static final int LIMIT_COUNT_UPLOADED_FILES = 24;
    
    private static AmazonService amazonService;
    
    private static UserService userService;
    
    public ImageListener() { }
    
    @Autowired
    public ImageListener(AmazonService amazonService, UserService userService) {
        ImageListener.amazonService = amazonService;
        ImageListener.userService = userService;
    }
    
    @PrePersist
    public void upload(Image image) {
        try {
            ApplicationUser user = getCurrentUser();
            if (canUploadImage(user)) {
                user.incrementCountUploadedFiles();
            } else {
                throw new UploadDataException("Unable to load an image into storage! Uploaded limit exceeded. Limit is " + LIMIT_COUNT_UPLOADED_FILES + " files.");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    
    @PreRemove
    public void delete(Image image) {
        try {
            ApplicationUser user = getCurrentUser();
            Boolean deleted = amazonService.deleteFileFromS3Bucket(image.getKey());
            if (deleted) {
                if (user.getCountUploadedFiles() > 0) {
                    user.decrementCountUploadedFiles();
                }
            } else {
                throw new NonExistDataException("Unable to delete image from storage!");
            }
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
    
    private boolean canUploadImage(ApplicationUser user) {
        return user.getCountUploadedFiles() < LIMIT_COUNT_UPLOADED_FILES;
    }
    
    private ApplicationUser getCurrentUser() {
        return userService.getById(SecurityContextHolder.getContext().getAuthentication().getName());
    }
    
}
