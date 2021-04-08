package com.growingnetwork.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class RootController {
    
    @GetMapping("/{path:^(?:(?!static|.html|ws|webjars).)*$}/**")
    public String redirectToIndexHtml(@PathVariable String path) {
        return "forward:/index.html";
    }
    
}
