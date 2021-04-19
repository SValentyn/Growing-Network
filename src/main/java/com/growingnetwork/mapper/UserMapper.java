package com.growingnetwork.mapper;

import com.growingnetwork.dto.user.FriendSuggestionDtoOut;
import com.growingnetwork.dto.user.UserDtoIn;
import com.growingnetwork.dto.user.UserDtoOut;
import com.growingnetwork.dto.user.UserLabelDtoIn;
import com.growingnetwork.dto.user.UserLabelDtoOut;
import com.growingnetwork.dto.user.UserRegistrationDtoIn;
import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.enums.FriendshipStatus;
import com.growingnetwork.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class UserMapper extends AbstractControllerToCrudServiceMapper<ApplicationUser, String, UserDtoIn, UserDtoOut, UserService> {
    
    @Autowired
    public UserMapper(ModelMapper modelMapper, UserService crudService) {
        super(modelMapper, crudService);
    }
    
    @Override
    protected UserDtoOut responseDtoOf(ApplicationUser entity) {
        UserDtoOut user = modelMapper.map(entity, UserDtoOut.class);
        user.setEmailIsConfirmed(entity.getToken().getEmailIsConfirmed());
        return user;
    }
    
    @Override
    public ApplicationUser entityOf(UserDtoIn dtoIn) {
        return modelMapper.map(dtoIn, ApplicationUser.class);
    }
    
    private ApplicationUser entityOf(UserRegistrationDtoIn userData) {
        ApplicationUser user = modelMapper.map(userData, ApplicationUser.class);
        user.setToken(new com.growingnetwork.model.Token());
        return user;
    }
    
    public ApplicationUser entityOf(String userId) {
        return crudService.getById(userId);
    }
    
    public List<ApplicationUser> entityOf(List<UserLabelDtoIn> userLabels) {
        List<String> userIds = userLabels.stream()
                .map(UserLabelDtoIn::getUsername)
                .collect(Collectors.toList());
        return crudService.getAllUsersFromList(userIds);
    }
    
    public com.growingnetwork.dto.security.Token signUp(UserRegistrationDtoIn registrationData) {
        return new com.growingnetwork.dto.security.Token(crudService.signUp(entityOf(registrationData)));
    }
    
    public List<UserDtoOut> usersSearch(String query, Pageable pageable) {
        return crudService.getUsersByQuery(query, pageable)
                .stream()
                .map(this::responseDtoOf)
                .collect(Collectors.toList());
    }
    
    public UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {
        return modelMapper.map(entity, UserLabelDtoOut.class);
    }
    
    public Boolean confirmEmail(String emailConfirmationId) {
        return crudService.confirmEmail(emailConfirmationId);
    }
    
    public String generateRefreshToken(String username) {
        return crudService.generateRefreshToken(username);
    }
    
    public void sendChangePasswordLink(String email) {
        crudService.sendChangePasswordLink(email);
    }
    
    public void setNewPassword(String forgotPasswordToken, String password) {
        crudService.setNewPassword(forgotPasswordToken, password);
    }
    
    public UserDtoOut deleteFriend(String friendUsername) {
        return responseDtoOf(crudService.deleteFriend(friendUsername));
    }
    
    public List<UserLabelDtoOut> getUserFriends(Pageable pageable, String username) {
        return crudService.getUserFriends(pageable, username).stream()
                .limit(pageable.getPageSize())
                .map(this::userLabelDtoOf)
                .collect(Collectors.toList());
    }
    
    public List<FriendSuggestionDtoOut> getUserFriendSuggestions(Integer pageSize) {
        return crudService.getUserFriendSuggestions(pageSize)
                .entrySet().stream()
                .map(entry -> FriendSuggestionDtoOut.builder()
                        .user(userLabelDtoOf(entry.getKey()))
                        .commonFriends(entry.getValue().stream()
                                .map(this::userLabelDtoOf)
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }
    
    public FriendshipStatus checkFriendshipStatus(String username) {
        return crudService.checkFriendshipStatus(username);
    }
    
    public List<UserLabelDtoOut> getActiveFriends(Pageable pageable) {
        return crudService.getActiveFriends(pageable).stream().map(this::userLabelDtoOf).collect(Collectors.toList());
    }
}


