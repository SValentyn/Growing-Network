package com.growingnetwork.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "comments")
public class Comment implements DbEntity<Long> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "message")
    private String message;
    
    @Column(name = "date")
    private Long date;
    
    @ManyToOne
    @JoinColumn(name = "fk_author_username")
    private ApplicationUser author;
    
    @ManyToOne
    @JoinColumn(name = "fk_post_id")
    @JsonBackReference
    private Post post;
    
}
