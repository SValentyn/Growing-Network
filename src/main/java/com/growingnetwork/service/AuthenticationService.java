package com.growingnetwork.service;

import com.growingnetwork.dto.security.UserCredentials;
import com.growingnetwork.model.ApplicationUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface AuthenticationService {
    
    String getAccessToken(UserCredentials credentials);
    
    String getAccessToken(String username, String password);
    
    UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req);
    
    String getAccessTokenByRefreshToken(String refreshToken, String user);
    
    String generateRefreshToken(String username);
    
    void logout(String username);
    
    String generateForgotPasswordToken(ApplicationUser user);
    
    String generateTokenForOauthUser(String email);
    
}
