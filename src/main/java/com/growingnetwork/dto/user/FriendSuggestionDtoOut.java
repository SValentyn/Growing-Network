package com.growingnetwork.dto.user;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class FriendSuggestionDtoOut {
    
    private UserLabelDtoOut user;
    private List<UserLabelDtoOut> commonFriends;
    
}
