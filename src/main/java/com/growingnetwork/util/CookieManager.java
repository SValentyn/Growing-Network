package com.growingnetwork.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.growingnetwork.security.SecurityConstants.REFRESH_TOKEN_COOKIE_NAME;
import static com.growingnetwork.security.SecurityConstants.REFRESH_TOKEN_COOKIE_PATH;
import static com.growingnetwork.security.SecurityConstants.REFRESH_TOKEN_MAX_AGE;

@Component
public class CookieManager {
    
    public void addRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
        cookie.setPath(REFRESH_TOKEN_COOKIE_PATH);
        cookie.setMaxAge((int) (REFRESH_TOKEN_MAX_AGE / 1000));
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
    
    public void removeRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, "");
        cookie.setPath(REFRESH_TOKEN_COOKIE_PATH);
        cookie.setMaxAge(0);
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }
    
}
