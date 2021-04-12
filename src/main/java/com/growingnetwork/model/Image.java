package com.growingnetwork.model;

import com.growingnetwork.util.ImageListener;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@EntityListeners(value = ImageListener.class)
@Table(name = "images")
public class Image implements DbEntity<Long> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    
    @Column(name = "src_key")
    private String key;
    
    @Column(name = "src")
    private String src;
    
}
