package com.growingnetwork.controller;

import com.growingnetwork.dto.security.Token;
import com.growingnetwork.dto.security.UserCredentials;
import com.growingnetwork.mapper.AuthenticationMapper;
import com.growingnetwork.util.CookieManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static com.growingnetwork.security.SecurityConstants.REFRESH_TOKEN_COOKIE_NAME;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController {
    
    private final AuthenticationMapper authenticationMapper;
    private final CookieManager cookieManager;
    
    @Autowired
    public AuthenticationController(AuthenticationMapper authenticationMapper, CookieManager cookieManager) {
        this.authenticationMapper = authenticationMapper;
        this.cookieManager = cookieManager;
    }
    
    @PostMapping("/access-token")
    public ResponseEntity<Token> getAccessJwt(@RequestBody UserCredentials credentials, HttpServletResponse resp) {
        Token token = authenticationMapper.getAccessToken(credentials);
        String newRefreshToken = authenticationMapper.generateRefreshToken(credentials.getUsername());
        cookieManager.addRefreshTokenCookie(resp, newRefreshToken);
        
        return ResponseEntity.ok(token);
    }
    
    @PostMapping("/reissue-tokens/{username}")
    public ResponseEntity<Token> refreshAccessJwt(@PathVariable String username,
                                                  @CookieValue(REFRESH_TOKEN_COOKIE_NAME) String refreshToken,
                                                  HttpServletResponse response) {
        
        Token token = authenticationMapper.getAccessTokenByRefreshToken(refreshToken, username);
        String newRefreshToken = authenticationMapper.generateRefreshToken(username);
        cookieManager.addRefreshTokenCookie(response, newRefreshToken);
        
        return ResponseEntity.ok(token);
    }
    
    @PostMapping("/logout/{username}")
    public ResponseEntity<String> logout(@PathVariable String username, HttpServletResponse response) {
        authenticationMapper.logout(username);
        cookieManager.removeRefreshTokenCookie(response);
        return ResponseEntity.ok("User has been logged out!");
    }
    
}
