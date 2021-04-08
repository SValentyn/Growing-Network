package com.growingnetwork.repository;

import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {
    
    List<FriendRequest> getAllByRequester(ApplicationUser requester);
    
    List<FriendRequest> getAllByResponder(ApplicationUser requester);
    
    List<FriendRequest> getAllByResponderUsername(String username);
    
}
