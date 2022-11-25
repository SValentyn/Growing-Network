package com.growingnetwork.exception;

public class UploadDataException extends RuntimeException {
    
    public UploadDataException(String message) {
        super(message);
    }
    
    public UploadDataException(String message, Throwable cause) {
        super(message, cause);
    }
    
}
