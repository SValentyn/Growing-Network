package com.growingnetwork.dto.chat.message;

import com.growingnetwork.dto.chat.ChatDtoOut;
import com.growingnetwork.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class ChatMessageDtoOut {
    
    private Long id;
    private String message;
    private Long date;
    private UserLabelDtoOut author;
    private ChatDtoOut chat;
    
}
