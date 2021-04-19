/* TOKENS_STORAGE */
INSERT INTO tokens_storage (refresh_token, refresh_token_valid_till, forgot_password_token, forgot_password_token_valid_till, email_confirmation_id, email_is_confirmed)
VALUES ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '90271bb8-3eae-4ebf-89dc-4bc75409ab60', true),
       ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '90271bb8-3eae-4ebf-89dc-4bc75409ab61', true),
       ('e4ed11a0-c2a8-448d-aece-4850ec44f3ed', 0, '', 0, '90271bb8-3eae-4ebf-89dc-4bc75409ab62', true);

/* IMAGES [Amazon AWS S3] */
# INSERT INTO images (src_key, src)
# VALUES

/* USERS [password = 000000] */
INSERT INTO users (username, password, email, first_name, last_name, birth_date, gender, joined_date, last_activity_time, fk_avatar_img_id, fk_cover_img_id, open_account, fk_tokens_data_id)
VALUES ('admin1', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'growingnetwork.service@gmail.com', 'GN', 'Service',1618012800000, 2, '2021-01-01 00:00:01', 1617840000000, null, null, true, 1),
       ('suggestFriend0', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'suggestFriend0@test.com','Harry', 'Potter', 1618012800000, 0, '2021-01-01 00:00:01', 1617840000000, null, null, true, 2),
       ('suggestFriend1', '$2a$10$YNN2VpvnrFYDGnAbjBBaouSLMzyV.86ocPszcTftyvL2ai/9eP4rq', 'suggestFriend1@test.com','Conan', 'Doyle', 1618012800000, 0, '2021-01-01 00:00:01', 1617840000000, null, null, true, 3);

/* FRIENDS */
INSERT INTO friends (fk_username, fk_friend_username)
VALUES ('admin1', 'suggestFriend0'),
       ('suggestFriend0', 'admin1'),

       ('suggestFriend0', 'suggestFriend1'),
       ('suggestFriend1', 'suggestFriend0');

/* FRIEND_REQUESTS */
# INSERT INTO friend_requests (fk_requester_username, fk_responder_username, date)
# VALUES

/* POSTS */
INSERT INTO posts (message, date, fk_image_id, show_everyone, fk_author_username, fk_owner_username)
VALUES ('This is the first post of the network!', 1617840000000, null, true, 'admin1', 'admin1');

/* COMMENTS */
INSERT INTO comments (message, date, fk_author_username, fk_post_id)
VALUES ('Wow!', 1617840000000, 'admin1', 1);

/* LIKES */
INSERT INTO likes (fk_post_id, fk_provider_username)
VALUES (1, 'admin1');

/* CHATS */
INSERT INTO chats (name)
VALUES ('Harry Potter');

/* CHAT_TO_USER */
INSERT INTO chat_to_user (fk_chat_id, fk_participant_username)
VALUES (1, 'admin1'),
       (1, 'suggestFriend0');

/* MESSAGES */
INSERT INTO messages (text, date, fk_author_username, fk_chat_id)
VALUES ('Hello my friend!', 1617840000000, 'admin1', 1);

/* UNREAD_MESSAGES */
INSERT INTO unread_messages (fk_username, fk_message_id)
VALUES ('suggestFriend0', 1);

/* TAGGED_FRIENDS */
# INSERT INTO tagged_friends (fk_post_id, fk_tagged_username)
# VALUES
