create table chats
(
    id   bigint auto_increment
        primary key,
    name varchar(255) null
);

create table images
(
    id      bigint auto_increment
        primary key,
    src_key varchar(255) null,
    src     varchar(255) null
);

create table tokens_storage
(
    id                               bigint auto_increment
        primary key,
    email_confirmation_id            varchar(255) null,
    email_is_confirmed               bit          null,
    forgot_password_token            varchar(255) null,
    forgot_password_token_valid_till bigint       null,
    refresh_token                    varchar(255) null,
    refresh_token_valid_till         bigint       null
);

create table users
(
    username           varchar(255)     not null
        primary key,
    birth_date         bigint           null,
    email              varchar(255)     null,
    first_name         varchar(255)     null,
    gender             int              null,
    last_activity_time bigint           null,
    last_name          varchar(255)     null,
    open_account       bit default b'1' null,
    password           varchar(255)     null,
    fk_avatar_img_id   bigint           null,
    fk_cover_img_id    bigint           null,
    fk_tokens_data_id  bigint           null,
    constraint FKa3688ngu9xww0d2xj8ad7ojq4
        foreign key (fk_avatar_img_id) references images (id),
    constraint FKpdo2ll8j7onu75lyn3whbc7ej
        foreign key (fk_cover_img_id) references images (id),
    constraint FKs5a09sgw8epgsvo9p3j1ql3e7
        foreign key (fk_tokens_data_id) references tokens_storage (id)
);

create table chat_to_user
(
    fk_chat_id              bigint       not null,
    fk_participant_username varchar(255) not null,
    constraint FK5f3x6x07w07vnyfs3uwaeb5jw
        foreign key (fk_chat_id) references chats (id),
    constraint FKihmydkqf7xwvnrcd3o8h3hun2
        foreign key (fk_participant_username) references users (username)
);

create table friend_requests
(
    id                    bigint auto_increment
        primary key,
    date                  bigint       null,
    fk_requester_username varchar(255) null,
    fk_responder_username varchar(255) null,
    constraint FK92hmq39x6glvcbw09hqs2kwlq
        foreign key (fk_responder_username) references users (username),
    constraint FKgslw6b94hm57qgnng3f3df4k6
        foreign key (fk_requester_username) references users (username)
);

create table friends
(
    fk_username        varchar(255) not null,
    fk_friend_username varchar(255) not null,
    constraint FK2x3rp0w22pqbl5t7tosj02ryd
        foreign key (fk_friend_username) references users (username),
    constraint FKcs7mywmbtyxd60i8g5forsyf4
        foreign key (fk_username) references users (username)
);

create table messages
(
    id         bigint auto_increment
        primary key,
    date       bigint       null,
    text       varchar(255) null,
    fk_author  varchar(255) null,
    fk_chat_id bigint       null,
    constraint FKckjarthn88un5eqer7pqj8lky
        foreign key (fk_chat_id) references chats (id),
    constraint FKe6o9x2jrgj9ax7a9x0gj3cwoe
        foreign key (fk_author) references users (username)
);

create table posts
(
    id                 bigint auto_increment
        primary key,
    date               bigint       null,
    message            varchar(255) null,
    show_everyone      bit          null,
    fk_author_username varchar(255) null,
    fk_image_id        bigint       null,
    fk_owner_username  varchar(255) null,
    constraint FK6lt1sqi50or7gjhqt4surshp2
        foreign key (fk_author_username) references users (username),
    constraint FKg9qihrf1gwynwyt7ic0le09mu
        foreign key (fk_image_id) references images (id),
    constraint FKkyx2txbe9rpqn0qerhtda1rrp
        foreign key (fk_owner_username) references users (username)
);

create table comments
(
    id                 bigint auto_increment
        primary key,
    date               bigint       null,
    message            varchar(255) null,
    fk_author_username varchar(255) null,
    fk_post_id         bigint       null,
    constraint FK85llbkc4xvx81wo0e00uupud1
        foreign key (fk_post_id) references posts (id),
    constraint FKars3bd5xqqkvvcsd17ouvhfva
        foreign key (fk_author_username) references users (username)
);

create table likes
(
    fk_post_id           bigint       not null,
    fk_provider_username varchar(255) not null,
    constraint FK20g5i5jayu9upewkj4cv5v7ks
        foreign key (fk_post_id) references posts (id),
    constraint FK45l94niilss3agtwd26k0tijp
        foreign key (fk_provider_username) references users (username)
);

create table tagged_friends
(
    fk_post_id         bigint       not null,
    fk_tagged_username varchar(255) not null,
    primary key (fk_post_id, fk_tagged_username),
    constraint FK6e1pfcbkk26xucx3hacyo4en3
        foreign key (fk_post_id) references posts (id),
    constraint FKes1uen697yl4cbgj387vgk1
        foreign key (fk_tagged_username) references users (username)
);

create table unread_messages
(
    fk_username   varchar(255) not null,
    fk_message_id bigint       not null,
    constraint FK13tps5eg3qyw6yk28k84hg6g9
        foreign key (fk_username) references users (username),
    constraint FKs80kbwxhrko9mfoba9oaivtqr
        foreign key (fk_message_id) references messages (id)
);

