package com.growingnetwork.controller;

public class TestConstants {
    
    public static final String CONTENT_TYPE_JSON = "application/json";
    
    public static final String URL_GET_ACCESS_TOKEN = "/api/v1/auth/access-token";
    public static final String URL_GET_CURRENT_USER = "/api/v1/users/current";
    public static final String URL_CONFIRM_EMAIL = "/api/v1/users/email/confirm/%s";
    public static final String URL_USERS_BASIC = "/api/v1/users";
    public static final String URL_CHATS_BASIC = "/api/v1/chats";
    public static final String URL_POSTS_BASIC = "/api/v1/posts";
    
    public static final String USER_USERNAME = "admin0";
    public static final String USER_PASSWORD = "000000";
    public static final String USER_EMAIL = "admin0@test.com";
    public static final String USER_FIRST_NAME = "admin";
    public static final String USER_LAST_NAME = "admin";
    public static final String USER_GENDER = "MALE";
    public static final Long USER_BIRTH_DATE = 946684800000L;
    public static final Boolean USER_OPEN_ACCOUNT = true;
    public static final String USER_AVATAR_URL = "https://growingnetwork.s3.eu-west-2.amazonaws.com/1617873943952-1cb9.png";
    public static final String USER_PROFILE_COVER_URL = "https://growingnetwork.s3.eu-west-2.amazonaws.com/1617873944017-67ae.png";
    public static final String USER_EMAIL_CONFIRMATION_ID = "c76010d6-cb42-4df8-b232-ae6651676ea3";
    
    public static final String OTHER_USER_USERNAME = "suggestFriend0";
    
}
