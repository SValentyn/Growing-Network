package com.growingnetwork.dto.friend.request;

import com.growingnetwork.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class FriendRequestDtoOut {
    
    private Long id;
    private Long date;
    private UserLabelDtoOut requester;
    
}
