package com.growingnetwork.dto.chat;

import com.growingnetwork.dto.user.UserLabelDtoOut;
import lombok.Data;

import java.util.List;

@Data
public class ChatDtoOut {
    
    private Long id;
    private String name;
    private List<UserLabelDtoOut> participants;
    
}
