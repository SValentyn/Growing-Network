package com.growingnetwork.mapper;

import com.growingnetwork.dto.security.Token;
import com.growingnetwork.dto.security.UserCredentials;
import com.growingnetwork.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class AuthenticationMapper {
    
    private final AuthenticationService authenticationService;
    
    @Autowired
    public AuthenticationMapper(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }
    
    public Token getAccessToken(UserCredentials credentials) {
        return new Token(authenticationService.getAccessToken(credentials));
    }
    
    public Token getAccessTokenByRefreshToken(String refreshToken, String username) {
        return new Token(authenticationService.getAccessTokenByRefreshToken(refreshToken, username));
    }
    
    public String generateRefreshToken(String username) {
        return authenticationService.generateRefreshToken(username);
    }
    
    public void logout(String username) {
        authenticationService.logout(username);
    }
    
}
