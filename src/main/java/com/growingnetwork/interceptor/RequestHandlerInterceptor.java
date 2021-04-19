package com.growingnetwork.interceptor;

import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@Component
@Slf4j
public class RequestHandlerInterceptor implements HandlerInterceptor {
    
    private final UserService userService;
    
    @Autowired
    public RequestHandlerInterceptor(@Lazy UserService userService) {
        this.userService = userService;
    }
    
    @Override
    public boolean preHandle(HttpServletRequest req, HttpServletResponse res, Object object) {
        try {
            Principal principal = SecurityContextHolder.getContext().getAuthentication();
            if (principal != null && !principal.getName().equals("anonymousUser")) {
                ApplicationUser user = userService.getById(principal.getName());
                user.setLastActivityTime(System.currentTimeMillis());
                userService.update(user);
            }
        } catch (Exception exc) {
            log.info(exc.getMessage());
        }
        return true;
    }
    
}
