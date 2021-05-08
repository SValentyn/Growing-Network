package com.growingnetwork.dto.user;

import com.growingnetwork.dto.image.ImageDtoOut;
import lombok.Data;

@Data
public class UserLabelDtoOut {
    
    private String username;
    private String firstName;
    private String lastName;
    private Long lastActivityTime;
    private String avatarColorHex;
    private ImageDtoOut avatar;
    
}
