/* TOKENS_STORAGE */
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_token, forgot_password_token_valid_till, email_confirmation_id, email_is_confirmed)
VALUES ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '', true),
       ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '', true),
       ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '', true);

/* IMAGES [Amazon AWS S3] */
INSERT INTO images (src_key, src)
VALUES ('1617857076589-2482.png', 'https://growingnetwork.s3.eu-west-2.amazonaws.com/profile-avatar-placeholder.png');

/* USERS [password = 000000] */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id)
VALUES ('admin0', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'admin0@test.com', 'Tyler', 'Durden',659998800000, 1, 1617840000000, 1, null, true, 1),
       ('suggestFriend0', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'suggestFriend0@test.com','Harry', 'Potter', 659880900990, 1, 1617840000000, 1, null, true, 2),
       ('suggestFriend1', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'suggestFriend1@test.com','Conan', 'Doyle', 659880900990, 1, 1617840000000, 1, null, true, 3);

/* FRIENDS */
INSERT INTO friends (fk_username, fk_friend_username)
VALUES ('admin0', 'suggestFriend0'),
       ('suggestFriend0', 'admin0'),

       ('suggestFriend0', 'suggestFriend1'),
       ('suggestFriend1', 'suggestFriend0');

/* FRIEND_REQUESTS */
# INSERT INTO friend_requests (fk_requester_username, fk_responder_username, date)
# VALUES

/* POSTS */
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username)
VALUES ('This is the first post of the network!', 1617840000000, null, true, 'admin0', 'admin0');

/* COMMENTS */
INSERT INTO comments (message, date, fk_author_username, fk_post_id)
VALUES ('Wow!', 1617840000000, 'admin0', 1);

/* LIKES */
INSERT INTO likes (fk_post_id, fk_provider_username)
VALUES (1, 'admin0');

/* CHATS */
# INSERT INTO chats (name)
# VALUES 

/* CHAT_TO_USER */
# INSERT INTO chat_to_user (fk_chat_id, fk_participant_username)
# VALUES 

/* MESSAGES */
# INSERT INTO messages (text, date, fk_author, fk_chat_id)
# VALUES 

/* UNREAD_MESSAGES */
# INSERT INTO unread_messages (fk_username, fk_message_id)
# VALUES 

/* TAGGED_FRIENDS */
# INSERT INTO tagged_friends (fk_post_id, fk_tagged_username)
# VALUES
