package com.growingnetwork.dto.user;

import lombok.Data;

@Data
public class UserRegistrationDtoIn {
    
    private String email;
    private String password;
    private String username;
    private String firstName;
    private String lastName;
    
}
