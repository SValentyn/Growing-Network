package com.growingnetwork.mapper;

import com.growingnetwork.dto.image.ImageDtoIn;
import com.growingnetwork.dto.image.ImageDtoOut;
import com.growingnetwork.model.Image;
import com.growingnetwork.service.AmazonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public final class ImageMapper extends AbstractControllerToCrudServiceMapper<Image, Long, ImageDtoIn, ImageDtoOut, AmazonService> {
    
    @Autowired
    public ImageMapper(ModelMapper modelMapper, AmazonService crudService) {
        super(modelMapper, crudService);
    }
    
    public ImageDtoOut responseDtoOf(Image entity) {
        return modelMapper.map(entity, ImageDtoOut.class);
    }
    
    @Override
    public Image entityOf(ImageDtoIn dtoIn) {
        return modelMapper.map(dtoIn, Image.class);
    }
    
    public ImageDtoOut uploadFile(MultipartFile file) {
        return responseDtoOf(crudService.uploadFile(file));
    }
    
}
