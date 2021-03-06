package com.growingnetwork.dto.user;

import com.growingnetwork.dto.image.ImageDtoIn;
import com.growingnetwork.model.enums.Gender;
import lombok.Data;

import java.util.Date;

@Data
public class UserDtoIn {
    
    private String email;
    private String firstName;
    private String lastName;
    private Long birthDate;
    private Gender gender;
    private String location;
    private Date joinedDate;
    private Boolean openAccount;
    private String avatarColorHex;
    private ImageDtoIn avatar;
    private ImageDtoIn profileCover;
    
}
