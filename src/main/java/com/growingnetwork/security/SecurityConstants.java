package com.growingnetwork.security;

public class SecurityConstants {
    
    private SecurityConstants() {
    }
    
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    
    public static final String LOGIN_URL = "/api/v1/auth/access-token";
    public static final String SIGN_UP_URL = "/api/v1/users";
    public static final String CONFIRM_EMAIL_URL = "/api/v1/users/email/confirm/**";
    public static final String RESET_PASSWORD_URL = "/api/v1/users/reset_password";
    public static final String SET_NEW_PASSWORD_URL = "/api/v1/users/set_new_password/**";
    public static final String GOOGLE_AUTH_URL = "/api/v1/auth/google";
    public static final String WEB_SOCKET_URL = "/ws";
    public static final String WEB_SOCKET_URL_EXTENDED = "/ws/**";
    
    public static final String REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
    public static final String REFRESH_TOKEN_COOKIE_PATH = "/api/v1/auth/reissue-tokens/";
    public static final String USE_REFRESH_TOKEN_URL = "/api/v1/auth/reissue-tokens/**";
    
    public static final long ACCESS_TOKEN_MAX_AGE = 1000L * 60 * 20; // 20 min
    public static final long FORGOT_PASSWORD_TOKEN_MAX_AGE = 1000L * 60 * 30; // 30 min
    public static final long REFRESH_TOKEN_MAX_AGE = 1000L * 60 * 60 * 24 * 30;
    
}
