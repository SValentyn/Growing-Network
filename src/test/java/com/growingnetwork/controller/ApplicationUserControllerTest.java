package com.growingnetwork.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.growingnetwork.dto.user.UserRegistrationDtoIn;
import com.growingnetwork.model.Image;
import com.growingnetwork.service.AmazonService;
import com.growingnetwork.util.EmailHandler;
import com.jayway.jsonpath.JsonPath;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.transaction.annotation.Transactional;

import static com.growingnetwork.controller.TestConstants.CONTENT_TYPE_JSON;
import static com.growingnetwork.controller.TestConstants.OTHER_USER_USERNAME;
import static com.growingnetwork.controller.TestConstants.URL_CONFIRM_EMAIL;
import static com.growingnetwork.controller.TestConstants.URL_GET_CURRENT_USER;
import static com.growingnetwork.controller.TestConstants.URL_USERS_BASIC;
import static com.growingnetwork.controller.TestConstants.USER_AVATAR_URL;
import static com.growingnetwork.controller.TestConstants.USER_BIRTH_DATE;
import static com.growingnetwork.controller.TestConstants.USER_EMAIL;
import static com.growingnetwork.controller.TestConstants.USER_EMAIL_CONFIRMATION_ID;
import static com.growingnetwork.controller.TestConstants.USER_FIRST_NAME;
import static com.growingnetwork.controller.TestConstants.USER_GENDER;
import static com.growingnetwork.controller.TestConstants.USER_LAST_NAME;
import static com.growingnetwork.controller.TestConstants.USER_OPEN_ACCOUNT;
import static com.growingnetwork.controller.TestConstants.USER_PROFILE_COVER_URL;
import static com.growingnetwork.controller.TestConstants.USER_USERNAME;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@Transactional
public class ApplicationUserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private ObjectMapper mapper;
    
    @MockBean
    private EmailHandler emailHandler;
    
    @MockBean
    private AmazonService imageService;
    
    @Test
    public void getCurrentUserShouldBlockRequestWithoutAuthentication() throws Exception {
        mockMvc.perform(get(URL_USERS_BASIC)).andExpect(status().isForbidden());
    }
    
    @Test
    @WithMockUser(username = USER_USERNAME)
    public void getCurrentUserShouldReturnUserObjectWithSuccessResponseCode() throws Exception {
        mockMvc.perform(get(URL_GET_CURRENT_USER))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(USER_USERNAME))
                .andExpect(jsonPath("$.firstName").value(USER_FIRST_NAME))
                .andExpect(jsonPath("$.lastName").value(USER_LAST_NAME))
                .andExpect(jsonPath("$.birthDate").value(USER_BIRTH_DATE))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.gender").value(USER_GENDER))
                .andExpect(jsonPath("$.openAccount").value(USER_OPEN_ACCOUNT))
                .andExpect(jsonPath("$.avatar.src").value(USER_AVATAR_URL))
                .andExpect(jsonPath("$.profileCover.src").value(USER_PROFILE_COVER_URL));
    }
    
    @Test
    public void signUpShouldCreateNewUserAndReturnAccessToken() throws Exception {
        String newUser = "newUser";
        String newPassword = "newPassword";
        String newEmail = "newEmail@test.com";
        
        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();
        
        userRegistrationDtoIn.setUsername(newUser);
        userRegistrationDtoIn.setPassword(newPassword);
        userRegistrationDtoIn.setEmail(newEmail);
        
        RequestBuilder requestBuilder = post(URL_USERS_BASIC)
                .contentType(CONTENT_TYPE_JSON)
                .content(mapper.writeValueAsString(userRegistrationDtoIn));
        
        String responseContentAsString = mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();
        
        String token = JsonPath.parse(responseContentAsString).read("$.accessToken");
        
        RequestBuilder checkCreatedUserRequest = get(URL_GET_CURRENT_USER)
                .header("Authorization", "Bearer " + token);
        
        mockMvc.perform(checkCreatedUserRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(newUser));
    }
    
    @Test
    @WithMockUser(username = USER_USERNAME)
    public void updateUserShouldReturnUserWithUpdatedFieldsAndNotNullFieldsAreNotEmpty() throws Exception {
        String newLastName = "suggestFriend_tmp";
        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();
        userRegistrationDtoIn.setLastName(newLastName);
        userRegistrationDtoIn.setUsername(USER_USERNAME);
        
        RequestBuilder requestBuilder = put(URL_USERS_BASIC)
                .content(mapper.writeValueAsString(userRegistrationDtoIn))
                .contentType(CONTENT_TYPE_JSON);
        
        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(USER_USERNAME))
                .andExpect(jsonPath("$.firstName").isNotEmpty())
                .andExpect(jsonPath("$.lastName").value(newLastName))
                .andExpect(jsonPath("$.birthDate").isEmpty())
                .andExpect(jsonPath("$.openAccount").isNotEmpty())
                .andExpect(jsonPath("$.email").isNotEmpty())
                .andExpect(jsonPath("$.emailIsConfirmed").isNotEmpty())
                .andExpect(jsonPath("$.avatar").isNotEmpty());
    }
    
    @Test
    public void updateUserShouldNotAllowUpdateNonAuthenticatedUser() throws Exception {
        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();
        
        RequestBuilder requestBuilder = put(URL_USERS_BASIC)
                .content(mapper.writeValueAsString(userRegistrationDtoIn))
                .contentType(CONTENT_TYPE_JSON);
        
        mockMvc.perform(requestBuilder)
                .andExpect(status().isForbidden());
    }
    
    @Test
    public void deleteUserShouldNotAllowToDeleteNonAuthenticatedUser() throws Exception {
        mockMvc.perform(delete(URL_USERS_BASIC)).andExpect(status().isForbidden());
    }
    
    @Test
    @WithMockUser(username = OTHER_USER_USERNAME)
    public void deleteUserShouldDeleteAuthenticatedUser() throws Exception {
        Image image = new Image();
        image.setId(1L);
        when(imageService.deleteFileFromS3Bucket(anyString())).thenReturn(true);
        
        mockMvc.perform(delete(URL_USERS_BASIC))
                .andExpect(status().isOk());
    }
    
    @Test
    public void confirmEmailShouldReturnTrueIfIdIsValid() throws Exception {
        mockMvc.perform(get(String.format(URL_CONFIRM_EMAIL, USER_EMAIL_CONFIRMATION_ID))).andExpect(status().isOk());
    }
    
    @Test
    public void confirmEmailShouldReturnConflictIfIdIsInvalid() throws Exception {
        mockMvc.perform(get(String.format(URL_CONFIRM_EMAIL, "INVALID_EMAIL_CONFIRMATION_ID"))).andExpect(status().isConflict());
    }
    
}
