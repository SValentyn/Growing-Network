package com.growingnetwork.repository;

import com.growingnetwork.model.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    
    Page<ChatMessage> getAllByChatId(Long chatId, Pageable pageable);
    
    Optional<ChatMessage> findTopByChatIdOrderByDateDesc(Long chatId);
    
}
