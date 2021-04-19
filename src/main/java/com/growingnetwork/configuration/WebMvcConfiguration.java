package com.growingnetwork.configuration;

import com.growingnetwork.interceptor.RequestHandlerInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfiguration implements WebMvcConfigurer {
    
    private final RequestHandlerInterceptor requestHandlerInterceptor;
    
    @Autowired
    public WebMvcConfiguration(RequestHandlerInterceptor requestHandlerInterceptor) {
        this.requestHandlerInterceptor = requestHandlerInterceptor;
    }
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(requestHandlerInterceptor);
    }
    
}
