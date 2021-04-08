package com.growingnetwork.service;

import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.Chat;
import com.growingnetwork.repository.ChatRepository;
import com.growingnetwork.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public final class ChatService extends AbstractCrudService<Chat, Long, ChatRepository> {
    
    private final UserService userService;
    
    @Autowired
    public ChatService(ChatRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean, @Lazy UserService userService) {
        super(jpaRepository, beanUtilsBean);
        this.userService = userService;
    }
    
    public Chat removeParticipant(Long chatId, String participantUsername) {
        Chat chat = getById(chatId);
        return removeParticipant(chat, participantUsername);
    }
    
    public Chat removeParticipant(Chat chat, String participantUsername) {
        List<ApplicationUser> filteredParticipantsList = chat.getParticipants().stream()
                .filter(participant -> !participant.getUsername().equals(participantUsername))
                .collect(Collectors.toList());
        chat.setParticipants(filteredParticipantsList);
        return jpaRepository.save(chat);
    }
    
    public List<Chat> getAllChatsWithPrincipal() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser user = userService.getById(principal.getName());
        return jpaRepository.getAllByParticipantsContaining(user);
    }
    
    public Chat getChatWithParticipant(String participantUsername) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser user = userService.getById(principal.getName());
        ApplicationUser participant = userService.getById(participantUsername);
        
        List<Chat> chatsContainingParticipants = jpaRepository
                .getChatsByParticipantsContainingAndParticipantsContaining(user, participant);
        
        chatsContainingParticipants.stream().filter(chat -> chat.getParticipants().size() != 2)
                .findAny().ifPresent(chatsContainingParticipants::remove);
        
        if (chatsContainingParticipants.size() == 1) {
            return chatsContainingParticipants.get(0);
        } else {
            return createChat(participantUsername);
        }
    }
    
    public Chat createChat(String participantUsername) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser user = userService.getById(principal.getName());
        ApplicationUser participant = userService.getById(participantUsername);
        
        Chat chat = new Chat();
        chat.setName(participant.getFirstName() + ' ' + participant.getLastName());
        chat.setParticipants(Arrays.asList(user, participant));
        
        return jpaRepository.save(chat);
    }
    
}
