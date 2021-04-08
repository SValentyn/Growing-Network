package com.growingnetwork.dto.chat;

import com.growingnetwork.dto.chat.message.ChatMessageDtoOut;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UnreadChatDtoOut {
    
    private Long chatId;
    private Long lastUpdate;
    private List<ChatMessageDtoOut> unreadMessages;
    
}
