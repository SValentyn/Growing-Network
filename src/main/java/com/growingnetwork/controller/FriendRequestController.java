package com.growingnetwork.controller;

import com.growingnetwork.dto.friend.request.FriendRequestDtoOut;
import com.growingnetwork.dto.user.UserDtoOut;
import com.growingnetwork.dto.user.UserLabelDtoOut;
import com.growingnetwork.mapper.FriendRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/requests")
public class FriendRequestController {
    
    private final FriendRequestMapper friendRequestMapper;
    
    @Autowired
    public FriendRequestController(FriendRequestMapper friendRequestMapper) {
        this.friendRequestMapper = friendRequestMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<FriendRequestDtoOut>> getAllRequests() {
        return ResponseEntity.ok(friendRequestMapper.getAllRequests());
    }
    
    @Transactional
    @PostMapping("/{responder}")
    public ResponseEntity<UserDtoOut> createRequest(@PathVariable String responder) {
        return ResponseEntity.ok(friendRequestMapper.createRequest(responder));
    }
    
    @Transactional
    @PutMapping("/{requestId}")
    public ResponseEntity<UserLabelDtoOut> confirmRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(friendRequestMapper.confirmRequest(requestId));
    }
    
    @Transactional
    @DeleteMapping("/{requestId}")
    public ResponseEntity<FriendRequestDtoOut> deleteRequest(@PathVariable Long requestId) {
        return ResponseEntity.ok(friendRequestMapper.deleteRequest(requestId));
    }
    
}
