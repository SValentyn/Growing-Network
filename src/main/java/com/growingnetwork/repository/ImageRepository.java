package com.growingnetwork.repository;

import com.growingnetwork.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    
    Optional<Image> findByKey(String key);
    
}
