package com.growingnetwork.util.friendship;

import com.growingnetwork.model.ApplicationUser;

import java.util.Objects;

public class GraphVertex {
    
    public ApplicationUser user;
    
    public GraphVertex(ApplicationUser user) {
        this.user = user;
    }
    
    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }
        if (object == null || getClass() != object.getClass()) {
            return false;
        }
        GraphVertex that = (GraphVertex) object;
        return Objects.equals(user, that.user);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(user);
    }
    
}
