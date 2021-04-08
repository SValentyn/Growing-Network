package com.growingnetwork.dto.chat;

import com.growingnetwork.dto.chat.message.ChatMessageDtoOut;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatDtoOutWithLastMessage extends ChatDtoOut {
    
    private ChatMessageDtoOut lastMessage;
    
}
