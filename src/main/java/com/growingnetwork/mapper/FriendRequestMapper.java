package com.growingnetwork.mapper;

import com.growingnetwork.dto.friend.request.FriendRequestDtoIn;
import com.growingnetwork.dto.friend.request.FriendRequestDtoOut;
import com.growingnetwork.dto.user.UserDtoOut;
import com.growingnetwork.dto.user.UserLabelDtoOut;
import com.growingnetwork.model.FriendRequest;
import com.growingnetwork.service.FriendRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class FriendRequestMapper extends AbstractControllerToCrudServiceMapper<FriendRequest, Long, FriendRequestDtoIn, FriendRequestDtoOut, FriendRequestService> {
    
    private final UserMapper userMapper;
    
    @Autowired
    public FriendRequestMapper(ModelMapper modelMapper, UserMapper userMapper, FriendRequestService friendRequestService) {
        super(modelMapper, friendRequestService);
        this.userMapper = userMapper;
    }
    
    @Override
    public FriendRequestDtoOut responseDtoOf(FriendRequest entity) {
        return modelMapper.map(entity, FriendRequestDtoOut.class);
    }
    
    @Override
    public FriendRequest entityOf(FriendRequestDtoIn friendRequestDtoIn) {
        return modelMapper.map(friendRequestDtoIn, FriendRequest.class);
    }
    
    public UserDtoOut createRequest(String responder) {
        return userMapper.responseDtoOf(crudService.createRequest(responder));
    }
    
    public UserLabelDtoOut confirmRequest(Long requestId) {
        return userMapper.userLabelDtoOf(crudService.confirmRequest(requestId));
    }
    
    public FriendRequestDtoOut deleteRequest(Long requestId) {
        return responseDtoOf(crudService.deleteRequest(requestId));
    }
    
    public List<FriendRequestDtoOut> getAllRequests() {
        return crudService.getAllRequests().stream()
                .map(this::responseDtoOf)
                .collect(Collectors.toList());
    }
    
}
