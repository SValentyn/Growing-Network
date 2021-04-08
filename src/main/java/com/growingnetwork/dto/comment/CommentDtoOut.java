package com.growingnetwork.dto.comment;

import com.growingnetwork.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class CommentDtoOut {
    
    private Long id;
    private String message;
    private Long date;
    private UserLabelDtoOut author;
    
}
