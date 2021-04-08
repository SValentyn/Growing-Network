package com.growingnetwork.dto.user;

import com.growingnetwork.dto.image.ImageDtoIn;
import com.growingnetwork.model.Gender;
import lombok.Data;

@Data
public class UserDtoIn {
    
    private String email;
    private String firstName;
    private String lastName;
    private Long birthDate;
    private Gender gender;
    private Boolean openAccount;
    private ImageDtoIn avatar;
    private ImageDtoIn profileCover;
    
}
