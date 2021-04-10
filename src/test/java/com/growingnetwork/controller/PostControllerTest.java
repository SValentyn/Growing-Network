package com.growingnetwork.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.growingnetwork.controller.TestConstants.URL_POSTS_BASIC;
import static com.growingnetwork.controller.TestConstants.USER_USERNAME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class PostControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Test
    @WithMockUser(username = USER_USERNAME)
    public void getAllShouldReturnAllPosts() throws Exception {
        mockMvc.perform(get(URL_POSTS_BASIC))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*].message").exists())
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].showEveryone").isNotEmpty())
                .andExpect(jsonPath("$[*].image").exists())
                .andExpect(jsonPath("$[*].author.username").isNotEmpty())
                .andExpect(jsonPath("$[*].owner.username").isNotEmpty())
                .andExpect(jsonPath("$[*].comments").exists())
                .andExpect(jsonPath("$[*].likes").exists());
    }
    
}