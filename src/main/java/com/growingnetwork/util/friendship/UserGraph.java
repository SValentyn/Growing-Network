package com.growingnetwork.util.friendship;

import com.growingnetwork.model.ApplicationUser;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Set;
import java.util.stream.Collectors;

public class UserGraph {
    
    private final Map<GraphVertex, Set<GraphVertex>> adjacentVertices = new HashMap<>();
    
    protected void addVertex(ApplicationUser user) {
        adjacentVertices.putIfAbsent(new GraphVertex(user), new HashSet<>());
    }
    
    protected void removeVertex(ApplicationUser user) {
        GraphVertex vertex = new GraphVertex(user);
        adjacentVertices.values().forEach(item -> item.remove(vertex));
        adjacentVertices.remove(new GraphVertex(user));
    }
    
    protected void addEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
        GraphVertex firstVertex = new GraphVertex(firstUser);
        GraphVertex secondVertex = new GraphVertex(secondUser);
        adjacentVertices.get(firstVertex).add(secondVertex);
        adjacentVertices.get(secondVertex).add(firstVertex);
    }
    
    protected void removeEdge(ApplicationUser firstUser, ApplicationUser secondUser) {
        GraphVertex firstVertex = new GraphVertex(firstUser);
        GraphVertex secondVertex = new GraphVertex(secondUser);
        Set<GraphVertex> verticesForFirst = adjacentVertices.get(firstVertex);
        Set<GraphVertex> verticesForSecond = adjacentVertices.get(secondVertex);
        if (verticesForFirst != null) {
            verticesForFirst.remove(secondVertex);
        }
        if (verticesForSecond != null) {
            verticesForSecond.remove(firstVertex);
        }
    }
    
    private Set<GraphVertex> getAdjacentVertexes(ApplicationUser user) {
        return adjacentVertices.size() != 0 ? adjacentVertices.get(new GraphVertex(user)) : new HashSet<>();
    }
    
    protected Map<ApplicationUser, List<ApplicationUser>> breadthFirstTraversal(ApplicationUser currentUser) {
        Map<ApplicationUser, List<ApplicationUser>> friendshipSuggestions = new HashMap<>();
        Set<ApplicationUser> visited = new LinkedHashSet<>();
        Queue<ApplicationUser> friendsQueue = new LinkedList<>();
        
        visited.add(currentUser);
        
        getAdjacentVertexes(currentUser).forEach(vertex -> {
            visited.add(vertex.user);
            friendsQueue.add(vertex.user);
        });
        
        while (!friendsQueue.isEmpty()) {
            ApplicationUser user = friendsQueue.poll();
            getAdjacentVertexes(user)
                    .stream()
                    .filter(vertex -> !visited.contains(vertex.user))
                    .forEach(vertex -> {
                        friendshipSuggestions.put(vertex.user,
                                getAdjacentVertexes(vertex.user).stream()
                                        .map(v -> v.user)
                                        .collect(Collectors.toList()));
                        visited.add(vertex.user);
                    });
        }
        
        return friendshipSuggestions;
    }
    
}
