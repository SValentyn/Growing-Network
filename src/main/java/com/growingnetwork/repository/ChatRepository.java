package com.growingnetwork.repository;

import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    
    List<Chat> getAllByParticipantsContaining(ApplicationUser user);
    
    List<Chat> getChatsByParticipantsContainingAndParticipantsContaining(ApplicationUser user, ApplicationUser participant);
    
}
