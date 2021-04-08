package com.growingnetwork.dto.post;

import com.growingnetwork.dto.image.ImageDtoIn;
import com.growingnetwork.dto.user.UserLabelDtoIn;
import lombok.Data;

import java.util.List;

@Data
public class PostDtoIn {
    
    private String message;
    private Boolean showEveryone;
    private ImageDtoIn image;
    private List<UserLabelDtoIn> taggedUsers;
    
}
