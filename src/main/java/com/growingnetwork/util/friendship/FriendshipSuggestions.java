package com.growingnetwork.util.friendship;

import com.growingnetwork.model.ApplicationUser;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class FriendshipSuggestions {
    
    private final ApplicationUser currentUser;
    private final UserGraph graph;
    
    public FriendshipSuggestions(ApplicationUser currentUser) {
        this.currentUser = currentUser;
        this.graph = new UserGraph();
    }
    
    public Map<ApplicationUser, List<ApplicationUser>> getFriendshipSuggestions() {
        currentUser.getFriends().forEach(friend -> {
            addVertexForGraph(friend);
            addVertexForGraph(friend.getFriends());
        });
        
        currentUser.getFriends().forEach(friend -> addEdgesForGraph(friend, friend.getFriends()));
        
        // Breadth-First Traversal
        return graph.breadthFirstTraversal(currentUser).entrySet()
                .stream()
                .filter(user -> !checkFriendRequests(user.getKey()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
    
    private boolean checkFriendRequests(ApplicationUser user) {
        return (user.getIncomingFriendRequests().stream().anyMatch(friendRequest -> friendRequest.getRequester().equals(currentUser)))
                || (currentUser.getIncomingFriendRequests().stream().anyMatch(friendRequest -> friendRequest.getRequester().equals(user)));
    }
    
    private void addVertexForGraph(ApplicationUser user) {
        graph.addVertex(user);
    }
    
    private void addVertexForGraph(List<ApplicationUser> friendsOfMyFriend) {
        friendsOfMyFriend.forEach(graph::addVertex);
    }
    
    private void addEdgesForGraph(ApplicationUser friend, List<ApplicationUser> friendsOfMyFriend) {
        friendsOfMyFriend.forEach(friendOfMyFriend -> graph.addEdge(friend, friendOfMyFriend));
    }
    
}
