package com.growingnetwork.controller;

import com.growingnetwork.dto.comment.CommentDtoIn;
import com.growingnetwork.dto.image.ImageDtoOut;
import com.growingnetwork.dto.post.PostDtoIn;
import com.growingnetwork.dto.post.PostDtoOut;
import com.growingnetwork.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "api/v1/posts")
public class PostController {
    
    private final PostMapper postMapper;
    
    @Autowired
    public PostController(PostMapper postMapper) {
        this.postMapper = postMapper;
    }
    
    @GetMapping
    public ResponseEntity<List<PostDtoOut>> getAllPostsForFeed(@PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postMapper.getAllPostsForFeed(pageable));
    }
    
    @GetMapping("/profile/{feedOwner}")
    public ResponseEntity<List<PostDtoOut>> getAllUserPosts(@PathVariable String feedOwner,
                                                            @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postMapper.getAllUsersPosts(feedOwner, pageable));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<PostDtoOut> getPostById(@PathVariable Long id) {
        PostDtoOut postDtoOut = postMapper.getById(id);
        return ResponseEntity.ok(postDtoOut);
    }
    
    @PostMapping("/profile")
    public ResponseEntity<PostDtoOut> createPostInProfile(@RequestBody PostDtoIn post) {
        PostDtoOut postDtoOut = postMapper.create(post);
        return ResponseEntity.ok(postDtoOut);
    }
    
    @PostMapping("/{feedOwner}")
    public ResponseEntity<PostDtoOut> createPostInOtherFeed(@RequestBody PostDtoIn post, @PathVariable String feedOwner) {
        PostDtoOut postDtoOut = postMapper.createPostInOtherFeed(post, feedOwner);
        return ResponseEntity.ok(postDtoOut);
    }
    
    @Transactional
    @PutMapping("/{id}")
    public ResponseEntity<PostDtoOut> update(@PathVariable Long id, @RequestBody PostDtoIn post) {
        PostDtoOut postDtoOut = postMapper.update(id, post);
        return ResponseEntity.ok(postDtoOut);
    }
    
    @Transactional
    @DeleteMapping("/{id}")
    public ResponseEntity<PostDtoOut> delete(@PathVariable Long id) {
        PostDtoOut postDtoOut = postMapper.delete(id);
        return ResponseEntity.ok(postDtoOut);
    }
    
    @PutMapping("/{postId}/like")
    public ResponseEntity<PostDtoOut> updateLikes(@PathVariable Long postId) {
        return ResponseEntity.ok(postMapper.updateLikes(postId));
    }
    
    @PostMapping("/{postId}/comment")
    public ResponseEntity<PostDtoOut> createComment(@PathVariable Long postId, @RequestBody CommentDtoIn commentDtoIn) {
        return ResponseEntity.ok(postMapper.createComment(postId, commentDtoIn));
    }
    
    @DeleteMapping("/{postId}/comment/{commentId}")
    public ResponseEntity<PostDtoOut> deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        return ResponseEntity.ok(postMapper.deleteComment(postId, commentId));
    }
    
    @GetMapping("/photos/{userId}")
    public ResponseEntity<List<ImageDtoOut>> getUserPhotosFromPosts(@PathVariable(required = false) String userId,
                                                                    @PageableDefault(sort = {"id"}, direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(postMapper.getUserPhotosFromPosts(userId, pageable));
    }
    
    @PostMapping("/{postId}/tag_friends")
    public ResponseEntity<PostDtoOut> tagFriends(@PathVariable Long postId, @RequestBody ArrayList<String> taggedUserNames) {
        return ResponseEntity.ok(postMapper.tagFriends(postId, taggedUserNames));
    }
    
    @DeleteMapping("/{postId}/tag_friends")
    public ResponseEntity<PostDtoOut> deletePrincipalTagFromPost(@PathVariable Long postId) {
        return ResponseEntity.ok(postMapper.deletePrincipalTagFromPost(postId));
    }
    
}
