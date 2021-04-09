package com.growingnetwork.controller;

import com.growingnetwork.dto.chat.ChatDtoOut;
import com.growingnetwork.dto.chat.ChatDtoOutWithLastMessage;
import com.growingnetwork.mapper.ChatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {
    
    private final ChatMapper chatMapper;
    
    @Autowired
    public ChatController(ChatMapper chatMapper) {
        this.chatMapper = chatMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<ChatDtoOutWithLastMessage>> getAllChatsWithPrincipal() {
        return ResponseEntity.ok(chatMapper.getAllChatsWithPrincipal());
    }
    
    @GetMapping("/{participantUsername}")
    public ResponseEntity<ChatDtoOut> getChatWithParticipant(@PathVariable String participantUsername) {
        return ResponseEntity.ok(chatMapper.getChatWithParticipant(participantUsername));
    }
    
    @PostMapping("/{participantUsername}")
    public ResponseEntity<ChatDtoOut> createChat(@PathVariable String participantUsername) {
        return ResponseEntity.ok(chatMapper.createChat(participantUsername));
    }
}
