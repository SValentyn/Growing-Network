package com.growingnetwork.security;

import com.growingnetwork.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.growingnetwork.security.SecurityConstants.HEADER_STRING;
import static com.growingnetwork.security.SecurityConstants.TOKEN_PREFIX;

@Component
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {
    
    private final AuthenticationService authenticationService;
    
    @Autowired
    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, AuthenticationService authenticationService) {
        super(authenticationManager);
        this.authenticationService = authenticationService;
    }
    
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);
        if (validHeaderIsPresent(header)) {
            UsernamePasswordAuthenticationToken authentication = authenticationService.getAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        
        chain.doFilter(request, response);
    }
    
    private boolean validHeaderIsPresent(String header) {
        return header != null && header.startsWith(TOKEN_PREFIX);
    }
    
}
