package com.growingnetwork.exception;

public class IncorrectContentTypeException extends RuntimeException {
    
    public IncorrectContentTypeException(String message) {
        super(message);
    }
    
    public IncorrectContentTypeException(String message, Throwable cause) {
        super(message, cause);
    }
    
}