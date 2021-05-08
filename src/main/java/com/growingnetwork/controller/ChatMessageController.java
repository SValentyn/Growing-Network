package com.growingnetwork.controller;

import com.growingnetwork.dto.chat.UnreadChatDtoOut;
import com.growingnetwork.dto.chat.message.ChatMessageDtoIn;
import com.growingnetwork.dto.chat.message.ChatMessageDtoOut;
import com.growingnetwork.mapper.ChatMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/messages")
public class ChatMessageController {
    
    private final ChatMessageMapper chatMessageMapper;
    private final SimpMessagingTemplate messagingTemplate;
    
    @Autowired
    public ChatMessageController(ChatMessageMapper chatMessageMapper, SimpMessagingTemplate messagingTemplate) {
        this.chatMessageMapper = chatMessageMapper;
        this.messagingTemplate = messagingTemplate;
    }
    
    @GetMapping("/{chatId}")
    public ResponseEntity<Page<ChatMessageDtoOut>> getAllMessagesForChat(@PathVariable Long chatId,
                                                                         @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(chatMessageMapper.getAllMessagesForChat(chatId, pageable));
    }
    
    @PostMapping("/add")
    public ResponseEntity<ChatMessageDtoOut> sendMessage(@RequestBody ChatMessageDtoIn message) {
        ChatMessageDtoOut chatMessage = chatMessageMapper.create(message);
        chatMessage.getChat().getParticipants().forEach(participant ->
                messagingTemplate.convertAndSend(String.format("/topic/messages/%s", participant.getUsername()), chatMessage));
        return ResponseEntity.ok(chatMessage);
    }
    
    @GetMapping("/unread")
    public ResponseEntity<List<UnreadChatDtoOut>> getUnreadMessages() {
        return ResponseEntity.ok(chatMessageMapper.getUnreadChats());
    }
    
    @PutMapping("/unread/{chatId}")
    public ResponseEntity<Long> removeReadMessages(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatMessageMapper.removeReadMessages(chatId));
    }
    
}