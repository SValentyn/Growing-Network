package com.growingnetwork.service;

import com.growingnetwork.dto.security.UserCredentials;
import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.UUID;

import static com.growingnetwork.security.SecurityConstants.ACCESS_TOKEN_MAX_AGE;
import static com.growingnetwork.security.SecurityConstants.FORGOT_PASSWORD_TOKEN_MAX_AGE;
import static com.growingnetwork.security.SecurityConstants.HEADER_STRING;
import static com.growingnetwork.security.SecurityConstants.REFRESH_TOKEN_MAX_AGE;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    
    @Value("${spring.security.jwt-secret}")
    public String secret;
    
    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    
    @Autowired
    public AuthenticationServiceImpl(@Lazy AuthenticationManager authenticationManager, @Lazy UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }
    
    @Override
    public String getAccessToken(UserCredentials credentials) {
        return getAccessToken(credentials.getUsername(), credentials.getPassword());
    }
    
    @Override
    public String getAccessToken(String username, String password) {
        Authentication authenticationResult = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password, new ArrayList<>())
        );
        
        if (authenticationResult.isAuthenticated()) {
            return generateAccessToken(authenticationResult.getName());
        } else {
            throw new BadCredentialsException("Unable to authenticate user");
        }
    }
    
    public UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        UsernamePasswordAuthenticationToken result = null;
        if (token != null) {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token.replace("Bearer", ""))
                    .getBody();
            result = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, Collections.emptyList());
        }
        return result;
    }
    
    @Override
    public String getAccessTokenByRefreshToken(String refreshToken, String username) {
        ApplicationUser user = userService.getById(username);
        String userRefreshToken = user.getToken().getRefreshToken();
        Calendar tokenExpiration = Calendar.getInstance();
        tokenExpiration.setTimeInMillis(user.getToken().getRefreshTokenValidTill());
        
        if (userRefreshToken.equals(refreshToken) && tokenExpiration.after(Calendar.getInstance())) {
            return generateAccessToken(user.getUsername());
        } else {
            throw new BadCredentialsException("Access to the application has expired, please log in again.");
        }
    }
    
    @Override
    public String generateRefreshToken(String username) {
        ApplicationUser user = userService.getById(username);
        String refreshToken = UUID.randomUUID().toString();
        Token token = user.getToken();
        token.setRefreshToken(refreshToken);
        token.setRefreshTokenValidTill(System.currentTimeMillis() + REFRESH_TOKEN_MAX_AGE);
        userService.update(user);
        return refreshToken;
    }
    
    @Override
    public void logout(String username) {
        ApplicationUser user = userService.getById(username);
        user.getToken().setRefreshTokenValidTill(0L);
        user.getToken().setRefreshToken(null);
        userService.update(user);
    }
    
    @Override
    public String generateForgotPasswordToken(ApplicationUser user) {
        Token token = user.getToken();
        token.setForgotPasswordToken(UUID.randomUUID().toString());
        token.setForgotPasswordTokenValidTill(System.currentTimeMillis() + FORGOT_PASSWORD_TOKEN_MAX_AGE);
        userService.update(user);
        return user.getToken().getForgotPasswordToken();
    }
    
    @Override
    public String generateTokenForOauthUser(String email) {
        ApplicationUser user = userService.getUserByEmail(email);
        return generateAccessToken(user.getUsername());
    }
    
    private String generateAccessToken(String subject) {
        Calendar expirationTime = Calendar.getInstance();
        expirationTime.setTimeInMillis(System.currentTimeMillis() + ACCESS_TOKEN_MAX_AGE);
        
        return Jwts.builder()
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expirationTime.getTime())
                .setSubject(subject)
                .addClaims(Collections.emptyMap())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }
    
}
