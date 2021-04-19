package com.growingnetwork.exception;

public class NonExistDataException extends RuntimeException {
    
    public NonExistDataException() { }
    
    public NonExistDataException(String message) {
        super(message);
    }
    
    public NonExistDataException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
