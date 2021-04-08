package com.growingnetwork.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.growingnetwork.dto.security.UserCredentials;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static com.growingnetwork.controller.TestConstants.CONTENT_TYPE_JSON;
import static com.growingnetwork.controller.TestConstants.URL_GET_ACCESS_TOKEN;
import static com.growingnetwork.controller.TestConstants.USER_PASSWORD;
import static com.growingnetwork.controller.TestConstants.USER_USERNAME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class AuthenticationControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;
    
    @Test
    public void accessTokenWithValidCredentialsShouldReturnToken() throws Exception {
        UserCredentials credentials = new UserCredentials(USER_USERNAME, USER_PASSWORD);
        RequestBuilder requestBuilder = post(URL_GET_ACCESS_TOKEN)
                .contentType(CONTENT_TYPE_JSON)
                .content(mapper.writeValueAsString(credentials));
        
        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").exists());
    }
    
    @Test
    public void accessTokenWithInvalidPasswordShouldReturnBadRequestStatus() throws Exception {
        UserCredentials credentials = new UserCredentials(USER_USERNAME, "wrongPassword");
        RequestBuilder requestBuilder = post(URL_GET_ACCESS_TOKEN)
                .contentType(CONTENT_TYPE_JSON)
                .content(mapper.writeValueAsString(credentials));
        
        mockMvc.perform(requestBuilder)
                .andExpect(status().isBadRequest());
    }
    
}