package com.growingnetwork.service;

import com.growingnetwork.exception.NonExistDataException;
import com.growingnetwork.model.ApplicationUser;
import com.growingnetwork.model.FriendRequest;
import com.growingnetwork.model.Image;
import com.growingnetwork.model.Token;
import com.growingnetwork.model.enums.FriendshipStatus;
import com.growingnetwork.repository.UserRepository;
import com.growingnetwork.util.EmailHandler;
import com.growingnetwork.util.SmartCopyBeanUtilsBean;
import com.growingnetwork.util.friendship.FriendshipSuggestions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;

@Service
public class UserService extends AbstractCrudService<ApplicationUser, String, UserRepository> {
    
    public static final long LAST_THRESHOLD_OF_ONLINE_ACTIVITY = 900000; // 15 min
    private final BCryptPasswordEncoder bcryptPasswordEncoder;
    private final AuthenticationService authenticationService;
    private final ChatService chatService;
    private final FriendRequestService friendRequestService;
    private final PostService postService;
    private final AmazonService imageService;
    private final EmailHandler emailHandler;
    
    @Autowired
    public UserService(UserRepository jpaRepository,
                       SmartCopyBeanUtilsBean beanUtilBean,
                       BCryptPasswordEncoder bcryptPasswordEncoder,
                       AuthenticationService authenticationService,
                       ChatService chatService,
                       FriendRequestService friendRequestService,
                       PostService postService,
                       EmailHandler emailHandler,
                       AmazonService imageService) {
        super(jpaRepository, beanUtilBean);
        this.bcryptPasswordEncoder = bcryptPasswordEncoder;
        this.authenticationService = authenticationService;
        this.chatService = chatService;
        this.friendRequestService = friendRequestService;
        this.postService = postService;
        this.emailHandler = emailHandler;
        this.imageService = imageService;
    }
    
    @Override
    public ApplicationUser update(ApplicationUser user, ApplicationUser incomingEntity) {
        try {
            if (incomingEntity.getAvatar() != null) {
                Image avatar = imageService.getById(incomingEntity.getAvatar().getId());
                incomingEntity.setAvatar(avatar);
            }
            if (incomingEntity.getProfileCover() != null) {
                Image profileCover = imageService.getById(incomingEntity.getProfileCover().getId());
                incomingEntity.setProfileCover(profileCover);
            }
            beanUtilsBean.copyProperties(user, incomingEntity);
            return jpaRepository.save(user);
        } catch (ReflectiveOperationException reflectionException) {
            throw new RuntimeException(reflectionException.getMessage());
        }
    }
    
    @Override
    public List<ApplicationUser> getAll() {
        return jpaRepository.findAll();
    }
    
    public List<ApplicationUser> getAllUsersFromList(List<String> users) {
        if (users.size() > 0) {
            return jpaRepository.getAllUsersFromList(users);
        }
        return Collections.emptyList();
    }
    
    public String signUp(ApplicationUser user) {
        if (jpaRepository.findById(user.getUsername()).isPresent()) {
            throw new BadCredentialsException(String.format("User with username '%s' already exists!", user.getUsername()));
        }
        if (jpaRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new BadCredentialsException(String.format("User with email '%s' already exists!", user.getEmail()));
        }
        
        initTokenData(user);
        initApplicationUserData(user);
        String password = user.getPassword();
        user.setPassword(bcryptPasswordEncoder.encode(password));
        
        jpaRepository.save(user);
        emailHandler.sendEmailConfirmationLetter(user.getEmail(), user.getToken().getEmailConfirmationId());
        return authenticationService.getAccessToken(user.getUsername(), password);
    }
    
    private void initTokenData(ApplicationUser user) {
        Token token = user.getToken();
        token.setEmailIsConfirmed(false);
        token.setEmailConfirmationId(UUID.randomUUID().toString());
    }
    
    private void initApplicationUserData(ApplicationUser user) {
        blockApplicationUser(user, "Email not verified.");
        user.setIsAdmin(false);
        user.setJoinedDate(new Date());
        user.setCountUploadedFiles(0);
    }
    
    public Boolean confirmEmail(String confirmationId) {
        ApplicationUser user = jpaRepository.getByEmailConfirmationId(confirmationId).orElseThrow(() -> new NonExistDataException("Invalid email confirmation id!"));
        user.getToken().setEmailIsConfirmed(true);
        unblockApplicationUser(user);
        jpaRepository.save(user);
        return true;
    }
    
    public void blockApplicationUser(ApplicationUser user, String cause) {
        user.setOpenAccount(false);
    }
    
    public void unblockApplicationUser(ApplicationUser user) {
        user.setOpenAccount(true);
    }
    
    @Override
    @Transactional
    public ApplicationUser delete(String userId) {
        ApplicationUser deletedUser = getById(userId);
        deletedUser.getFriends().forEach(friend -> cancelFriendship(friend, userId));
        deletedUser.getChats().forEach(chat -> chatService.removeParticipant(chat, userId));
        friendRequestService.getAllByRequester(deletedUser).forEach(request -> friendRequestService.delete(request.getId()));
        friendRequestService.getAllByResponder(deletedUser).forEach(request -> friendRequestService.delete(request.getId()));
        postService.findAllPostsAuthoredBy(deletedUser.getUsername()).forEach(post -> postService.delete(post.getId()));
        postService.findAllUsersPosts(deletedUser.getUsername()).forEach(post -> postService.delete(post.getId()));
        deletedUser.setIncomingFriendRequests(Collections.emptyList());
        deletedUser.getLikedPosts().forEach(post -> {
            List<ApplicationUser> filteredLikes = post.getLikes().stream()
                    .filter(user -> !user.getUsername().equals(userId))
                    .collect(Collectors.toList());
            post.setLikes(filteredLikes);
            postService.update(post.getId(), post);
        });
        jpaRepository.delete(deletedUser);
        return deletedUser;
    }
    
    public String generateRefreshToken(String username) {
        return authenticationService.generateRefreshToken(username);
    }
    
    public void sendChangePasswordLink(String email) {
        ApplicationUser user = jpaRepository.findByEmail(email).orElseThrow(() -> new BadCredentialsException("Invalid email!"));
        String forgotPasswordToken = authenticationService.generateForgotPasswordToken(user);
        emailHandler.sendResetPasswordLetter(user.getEmail(), forgotPasswordToken);
    }
    
    public void setNewPassword(String forgotPasswordToken, String password) {
        ApplicationUser user = jpaRepository.getByToken_ForgotPasswordToken(forgotPasswordToken);
        if (user.getToken().getForgotPasswordTokenValidTill() < System.currentTimeMillis()) {
            throw new BadCredentialsException("Password recovery data has expired, please get new link!");
        }
        user.setPassword(bcryptPasswordEncoder.encode(password));
        user.getToken().setForgotPasswordTokenValidTill(0L);
        jpaRepository.save(user);
    }
    
    public Page<ApplicationUser> getUsersByQuery(String query, Pageable pageable) {
        return jpaRepository.findAllByFirstOrLastName(query.toLowerCase(), pageable);
    }
    
    public ApplicationUser deleteFriend(String friendUsername) {
        ApplicationUser user = getById(currentUsername());
        cancelFriendship(user, friendUsername);
        
        ApplicationUser friend = getById(friendUsername);
        cancelFriendship(friend, user.getUsername());
        
        return friend;
    }
    
    private void cancelFriendship(ApplicationUser user, String friendUsername) {
        List<ApplicationUser> friends = user.getFriends();
        friends.stream()
                .filter(friend -> friend.getUsername().equals(friendUsername))
                .findAny()
                .ifPresent(friends::remove);
        
        user.setFriends(friends);
        jpaRepository.save(user);
    }
    
    public List<ApplicationUser> getUserFriends(Pageable pageable, String username) {
        return jpaRepository.getAllUserFriends(username, pageable);
    }
    
    public Map<ApplicationUser, List<ApplicationUser>> getUserFriendSuggestions(Integer pageSize) {
        if (pageSize == null) {
            pageSize = 10;
        }
        ApplicationUser originalUser = getById(currentUsername());
        Map<ApplicationUser, List<ApplicationUser>> suggestionsWithUsingGraph = getFriendshipSuggestionsWithUsingGraph(originalUser, pageSize);
        int size = suggestionsWithUsingGraph.keySet().size();
        if (size < pageSize) {
            List<ApplicationUser> randomSuggestions = getAll();
            randomSuggestions.remove(originalUser);
            randomSuggestions.removeAll(originalUser.getFriends());
            randomSuggestions.removeAll(suggestionsWithUsingGraph.keySet());
            
            if (randomSuggestions.size() > 0) {
                List<ApplicationUser> finalRandomSuggestions = new ArrayList<>(randomSuggestions);
                for (ApplicationUser randomSuggestion : randomSuggestions) {
                    for (FriendRequest friendRequest : randomSuggestion.getIncomingFriendRequests()) {
                        if (friendRequest.getRequester().getId().equals(originalUser.getId())) {
                            finalRandomSuggestions.remove(randomSuggestion);
                            break;
                        }
                    }
                }
                
                randomSuggestions = finalRandomSuggestions;
                if (randomSuggestions.size() > 0) {
                    Collections.shuffle(randomSuggestions);
                    randomSuggestions.forEach(suggestion -> suggestionsWithUsingGraph.put(suggestion, Collections.emptyList()));
                    return suggestionsWithUsingGraph
                            .entrySet()
                            .stream()
                            .limit(pageSize)
                            .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
                }
            }
        }
        return suggestionsWithUsingGraph;
    }
    
    /**
     * Friendship suggestions using the graph
     */
    private Map<ApplicationUser, List<ApplicationUser>> getFriendshipSuggestionsWithUsingGraph(ApplicationUser originalUser, Integer pageSize) {
        return new FriendshipSuggestions(originalUser)
                .getFriendshipSuggestions()
                .entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue((list1, list2) -> list2.size() - list1.size()))
                .limit(pageSize)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (oldValue, newValue) -> oldValue, LinkedHashMap::new));
    }
    
    /**
     * Friendship suggestions using the stream
     */
    private Map<ApplicationUser, List<ApplicationUser>> getFriendshipSuggestionsWithUsingStream(ApplicationUser originalUser, Integer pageSize) {
        return originalUser.getFriends().stream()
                .flatMap(friend -> friend.getFriends().stream())
                .collect(groupingBy(u -> u, counting()))
                .entrySet().stream()
                .sorted((o1, o2) -> (int) (o1.getValue() - o2.getValue()))
                .filter(entry -> isRelevantFriendSuggestion(entry.getKey(), originalUser))
                .limit(pageSize)
                .collect(Collectors.toMap(Map.Entry::getKey, entry -> getCommonFriends(originalUser, entry.getKey())));
    }
    
    private List<ApplicationUser> getCommonFriends(ApplicationUser user1, ApplicationUser user2) {
        return user1.getFriends().stream()
                .filter(friend -> user2.getFriends().contains(friend))
                .collect(Collectors.toList());
    }
    
    private boolean isRelevantFriendSuggestion(ApplicationUser possibleFriend, ApplicationUser originalUser) {
        return !possibleFriend.getUsername().equals(originalUser.getUsername())
                && !originalUser.getFriends().contains(possibleFriend)
                && originalUser.getIncomingFriendRequests().stream().noneMatch(friendRequest -> friendRequest.getRequester().getId().equals(possibleFriend.getId()))
                && possibleFriend.getIncomingFriendRequests().stream().noneMatch(friendRequest -> friendRequest.getRequester().getId().equals(originalUser.getId()));
    }
    
    public FriendshipStatus checkFriendshipStatus(String targetUsername) {
        ApplicationUser currentUser = getById(currentUsername());
        ApplicationUser targetUser = getById(targetUsername);
        if (currentUser.getIncomingFriendRequests().stream().anyMatch(friendRequest -> friendRequest.getRequester().getUsername().equals(targetUsername))) {
            return FriendshipStatus.NEEDS_APPROVAL;
        } else if (targetUser.getIncomingFriendRequests().stream().anyMatch(friendRequest -> friendRequest.getRequester().getUsername().equals(currentUser.getUsername()))) {
            return FriendshipStatus.WAITING_FOR_APPROVAL;
        } else if (currentUser.getFriends().contains(targetUser)) {
            return FriendshipStatus.FRIENDS;
        }
        return FriendshipStatus.NOT_FRIENDS;
    }
    
    public Page<ApplicationUser> getActiveFriends(Pageable pageable) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser user = getById(principal.getName());
        long activityTime = System.currentTimeMillis() - LAST_THRESHOLD_OF_ONLINE_ACTIVITY;
        return jpaRepository.getActiveFriends(user, activityTime, pageable);
    }
    
    public ApplicationUser getUserByEmail(String email) {
        return jpaRepository.findByEmail(email)
                .orElseThrow(() -> new BadCredentialsException(String.format("There are no registered users with email '%s'.", email)));
    }
    
    private String currentUsername() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    
}
