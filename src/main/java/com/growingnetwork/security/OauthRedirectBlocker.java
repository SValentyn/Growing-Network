package com.growingnetwork.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.growingnetwork.security.SecurityConstants.GOOGLE_AUTH_URL;

@Component
public class OauthRedirectBlocker implements AuthenticationEntryPoint {
    
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        if (request.getRequestURI().contains(GOOGLE_AUTH_URL)) {
            response.sendRedirect("/oauth2/authorization/google");
        } else {
            response.setStatus(403);
        }
    }
    
}

