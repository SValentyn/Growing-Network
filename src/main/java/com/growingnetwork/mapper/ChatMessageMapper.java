package com.growingnetwork.mapper;

import com.growingnetwork.dto.chat.UnreadChatDtoOut;
import com.growingnetwork.dto.chat.message.ChatMessageDtoIn;
import com.growingnetwork.dto.chat.message.ChatMessageDtoOut;
import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.Chat;
import com.growingnetwork.model.ChatMessage;
import com.growingnetwork.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.groupingBy;

@Component
public final class ChatMessageMapper extends AbstractControllerToCrudServiceMapper<ChatMessage, Long, ChatMessageDtoIn, ChatMessageDtoOut, ChatMessageService> {
    
    private final ChatMapper chatMapper;
    private final UserMapper userMapper;
    
    @Autowired
    public ChatMessageMapper(ModelMapper modelMapper, ChatMessageService crudService, UserMapper userMapper, ChatMapper chatMapper) {
        super(modelMapper, crudService);
        this.userMapper = userMapper;
        this.chatMapper = chatMapper;
    }
    
    @Override
    public ChatMessageDtoOut responseDtoOf(ChatMessage entity) {
        return modelMapper.map(entity, ChatMessageDtoOut.class);
    }
    
    @Override
    public ChatMessage entityOf(ChatMessageDtoIn dtoIn) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser author = userMapper.entityOf(principal.getName());
        Chat chat = chatMapper.entityOf(dtoIn.getChatId());
        ChatMessage chatMessage = modelMapper.map(dtoIn, ChatMessage.class);
        chatMessage.setAuthor(author);
        chatMessage.setChat(chat);
        chatMessage.setDate(System.currentTimeMillis());
        return chatMessage;
    }
    
    public Page<ChatMessageDtoOut> getAllMessagesForChat(Long chatId, Pageable pageable) {
        return crudService.getAllMessagesForChat(chatId, pageable).map(this::responseDtoOf);
    }
    
    public List<UnreadChatDtoOut> getUnreadChats() {
        return crudService.getUnreadMessages()
                .stream()
                .collect(groupingBy(message -> message.getChat().getId()))
                .entrySet()
                .stream()
                .map(entry ->
                        UnreadChatDtoOut.builder()
                                .chatId(entry.getKey())
                                .unreadMessages(entry.getValue()
                                        .stream()
                                        .map(this::responseDtoOf)
                                        .collect(Collectors.toList()))
                                .lastUpdate(entry.getValue()
                                        .stream()
                                        .max(Comparator.comparingLong(ChatMessage::getDate))
                                        .orElseThrow(() -> new NullPointerException("Unable to get latest time of unread message: No date specified for chat message."))
                                        .getDate())
                                .build())
                .sorted(Comparator.comparingLong(UnreadChatDtoOut::getLastUpdate).reversed())
                .collect(Collectors.toList());
    }
    
    public Long removeReadMessages(Long chatId) {
        return crudService.removeReadMessages(chatId);
    }
    
}
