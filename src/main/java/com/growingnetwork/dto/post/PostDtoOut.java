package com.growingnetwork.dto.post;

import com.growingnetwork.dto.comment.CommentDtoOut;
import com.growingnetwork.dto.image.ImageDtoOut;
import com.growingnetwork.dto.user.UserLabelDtoOut;
import lombok.Data;

import java.util.List;

@Data
public class PostDtoOut {
    
    private Long id;
    private String message;
    private Long date;
    private Boolean showEveryone;
    private ImageDtoOut image;
    private UserLabelDtoOut author;
    private UserLabelDtoOut owner;
    private List<CommentDtoOut> comments;
    private List<UserLabelDtoOut> likes;
    private List<UserLabelDtoOut> taggedFriends;
    
}
