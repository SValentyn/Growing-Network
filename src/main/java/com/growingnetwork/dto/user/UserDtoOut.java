package com.growingnetwork.dto.user;

import com.growingnetwork.dto.image.ImageDtoOut;
import com.growingnetwork.model.enums.Gender;
import lombok.Data;

import java.util.Date;

@Data
public class UserDtoOut {
    
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private Long birthDate;
    private Gender gender;
    private String location;
    private Date joinedDate;
    private Boolean openAccount;
    private String avatarColorHex;
    private ImageDtoOut avatar;
    private ImageDtoOut profileCover;
    private Boolean emailIsConfirmed;
    
}
