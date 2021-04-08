package com.growingnetwork.mapper;

import com.growingnetwork.dto.chat.ChatDtoIn;
import com.growingnetwork.dto.chat.ChatDtoOut;
import com.growingnetwork.dto.chat.ChatDtoOutWithLastMessage;
import com.growingnetwork.dto.chat.message.ChatMessageDtoOut;
import com.growingnetwork.model.Chat;
import com.growingnetwork.model.ChatMessage;
import com.growingnetwork.service.ChatMessageService;
import com.growingnetwork.service.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class ChatMapper extends AbstractControllerToCrudServiceMapper<Chat, Long, ChatDtoIn, ChatDtoOut, ChatService> {
    
    private final ChatMessageService chatMessageService;
    
    @Autowired
    public ChatMapper(ModelMapper modelMapper, ChatService crudService, ChatMessageService chatMessageService) {
        super(modelMapper, crudService);
        this.chatMessageService = chatMessageService;
    }
    
    @Override
    public ChatDtoOut responseDtoOf(Chat entity) {
        return modelMapper.map(entity, ChatDtoOut.class);
    }
    
    @Override
    public Chat entityOf(ChatDtoIn dtoIn) {
        return modelMapper.map(dtoIn, Chat.class);
    }
    
    public Chat entityOf(Long chatId) {
        return crudService.getById(chatId);
    }
    
    public List<ChatDtoOutWithLastMessage> getAllChatsWithPrincipal() {
        return crudService.getAllChatsWithPrincipal()
                .stream()
                .map(chat -> modelMapper.map(chat, ChatDtoOutWithLastMessage.class))
                .peek(chatDto -> {
                    ChatMessage lastChatMessage = chatMessageService.findLastForChatIdList(chatDto.getId());
                    chatDto.setLastMessage(modelMapper.map(lastChatMessage, ChatMessageDtoOut.class));
                })
                .collect(Collectors.toList());
    }
    
    public ChatDtoOut getChatWithParticipant(String participantUsername) {
        return responseDtoOf(crudService.getChatWithParticipant(participantUsername));
    }
    
    public ChatDtoOut createChat(String participantUsername) {
        return responseDtoOf(crudService.createChat(participantUsername));
    }
    
}
