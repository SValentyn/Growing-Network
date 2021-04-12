package com.growingnetwork.util;

import com.growingnetwork.exception.NoDataFoundException;
import com.growingnetwork.model.Image;
import com.growingnetwork.service.AmazonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PreRemove;

@Component
public class ImageListener {
    
    private static AmazonService amazonService;
    
    public ImageListener() { }
    
    @Autowired
    public ImageListener(AmazonService amazonService) {
        ImageListener.amazonService = amazonService;
    }
    
    @PreRemove
    public void deleteFromStorage(Image image) {
        Boolean deleted = amazonService.deleteFileFromS3Bucket(image.getKey());
        if (!deleted) {
            throw new NoDataFoundException("Unable to delete image from storage!");
        }
    }
    
}
