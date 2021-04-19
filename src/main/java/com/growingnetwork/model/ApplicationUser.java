package com.growingnetwork.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.growingnetwork.model.enums.Gender;
import com.growingnetwork.util.MayAcceptNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationUser implements DbEntity<String> {
    
    @Id
    @Column(name = "username")
    private String username;
    
    @ToString.Exclude
    @JsonIgnore
    @Column(name = "password")
    private String password;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "first_name", length = 64)
    private String firstName;
    
    @Column(name = "last_name", length = 64)
    private String lastName;
    
    @MayAcceptNull
    @Column(name = "birth_date")
    private Long birthDate;
    
    @MayAcceptNull
    @Column(name = "gender")
    private Gender gender;
    
    @Column(name = "open_account")
    private Boolean openAccount;
    
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "joined_date", updatable = false)
    private Date joinedDate;
    
    @Column(name = "last_activity_time")
    private Long lastActivityTime;
    
    @Column(name = "count_uploaded_files", columnDefinition = "int default 0")
    private Integer countUploadedFiles;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_avatar_img_id")
    private Image avatar;
    
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "fk_cover_img_id")
    private Image profileCover;
    
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_tokens_data_id")
    @JsonBackReference
    private Token token;
    
    @ManyToMany
    @JoinTable(name = "friends",
            joinColumns = @JoinColumn(name = "fk_username"),
            inverseJoinColumns = @JoinColumn(name = "fk_friend_username"))
    private List<ApplicationUser> friends;
    
    @OneToMany(mappedBy = "responder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FriendRequest> incomingFriendRequests;
    
    @ManyToMany(mappedBy = "participants")
    @JsonBackReference
    private List<Chat> chats;
    
    @ManyToMany(mappedBy = "likes")
    @JsonBackReference
    private List<Post> likedPosts;
    
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<Comment> writtenComments;
    
    @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
    @JsonBackReference
    private List<ChatMessage> writtenMessages;
    
    @ManyToMany
    @JoinTable(name = "unread_messages",
            joinColumns = @JoinColumn(name = "fk_username"),
            inverseJoinColumns = @JoinColumn(name = "fk_message_id"))
    @JsonBackReference
    private List<ChatMessage> unreadMessages;
    
    @Override
    public String getId() {
        return username;
    }
    
    public void incrementCountUploadedFiles() {
        countUploadedFiles++;
    }
    
    public void decrementCountUploadedFiles() {
        countUploadedFiles--;
    }
    
}
