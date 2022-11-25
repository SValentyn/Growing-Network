package com.growingnetwork.controller;

import com.growingnetwork.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.growingnetwork.controller.TestConstants.URL_GET_CURRENT_USER;
import static com.growingnetwork.controller.TestConstants.USER_USERNAME;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class ExceptionControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserRepository userRepository;
    
    @Test
    @WithMockUser(username = USER_USERNAME)
    public void globalHandlerShouldReturnConflictStatusAndErrorMessage() throws Exception {
        String errorMessage = "Custom exception error message";
        when(userRepository.findById(USER_USERNAME)).thenThrow(new RuntimeException(errorMessage));
        
        mockMvc.perform(get(URL_GET_CURRENT_USER))
                .andExpect(status().isConflict())
                .andExpect(content().string(errorMessage));
    }
    
}