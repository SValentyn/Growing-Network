package com.growingnetwork.model;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "posts")
public class Post implements DbEntity<Long> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "message", length = 4096)
    private String message;
    
    @Column(name = "date")
    private Long date;
    
    @Column(name = "show_everyone")
    private Boolean showEveryone;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_image_id")
    private Image image;
    
    @ManyToOne
    @JoinColumn(name = "fk_author_username")
    private ApplicationUser author;
    
    @ManyToOne
    @JoinColumn(name = "fk_owner_username")
    private ApplicationUser owner;
    
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
    
    @ManyToMany
    @JoinTable(name = "likes",
            joinColumns = @JoinColumn(name = "fk_post_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_provider_username"))
    private List<ApplicationUser> likes;
    
    @ManyToMany
    @JoinTable(name = "tagged_friends",
            joinColumns = @JoinColumn(name = "fk_post_id"),
            inverseJoinColumns = @JoinColumn(name = "fk_tagged_username"))
    private Set<ApplicationUser> taggedFriends;
    
}
