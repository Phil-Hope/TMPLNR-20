create table user
(
    id              char(36)      not null comment '(DC2Type:uuid)'
        primary key,
    email           varchar(180)  not null,
    roles           json          not null,
    password        varchar(255)  not null,
    first_name      varchar(50)   not null,
    last_name       varchar(50)   not null,
    profile_picture varchar(255)  null,
    wage_per_hour   decimal(5, 2) null,
    contact_number  varchar(15)   not null,
    constraint UNIQ_8D93D649E7927C74
        unique (email)
)
    collate = utf8mb4_unicode_ci;

INSERT INTO user (id, email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number) VALUES ('0dc6dc94-236f-4f25-9d82-2d2453baeffc', 'amy@example.com', '["ROLE_USER"]', '$argon2i$v=19$m=65536,t=4,p=1$LjOFPHi/Jj+hHsL0mud/uQ$NHJuUa4aByaJF6otluyUeIb4icA6KZ93kkwX6HMb2Q4', 'Amy', 'Ross', 'https://media.publit.io/file/Untitled-design-X.png', 0.00, '0452845841');
INSERT INTO user (id, email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number) VALUES ('3a67bfb7-6535-4c05-9061-e33433b58187', 'mynewemail@example.com', '["ROLE_USER"]', '$argon2i$v=19$m=65536,t=4,p=1$6RO6DWYvOyMvg2dQbDt2eA$rMwyjOdlD+peBGhbhUZNdL8tRkIc0YWhn+BudOdhp20', 'Sam', 'Johnson', 'https://media.publit.io/file/Canva-Man-s-Face.jpg', 0.00, '045258152');
INSERT INTO user (id, email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number) VALUES ('a3e759f3-5eaa-46a1-bf92-7e8ed75f122b', 'katie@example.com', '["ROLE_USER"]', '$argon2i$v=19$m=65536,t=4,p=1$lA9bNDWPRZMSQYNMT/8jCQ$Nt8EXl2ZXIM6qq9uzZOVrM33xKmB0RL4qx86T+ERH98', 'Katie', 'Paris', 'https://media.publit.io/file/Canva-Closeup-Photo-of-Woman-Wearing-Eyeglasses.jpg', 0.00, '045215418');
INSERT INTO user (id, email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number) VALUES ('b73bcd64-72a1-4bf8-b15d-be0e89195a4b', 'phil_hope@live.com', '["ROLE_USER", "ROLE_ADMIN"]', '$argon2i$v=19$m=65536,t=4,p=1$NqNBoVw7muUEaNh2cz7FOw$kKZuwRVOw5cd8IkQC1h/z9zpzpQvidaAD0rJmZTGFiU', 'Phillip', 'Hope', 'https://media.publit.io/file/avatar-nG.png', 50.00, '0426828872');
INSERT INTO user (id, email, roles, password, first_name, last_name, profile_picture, wage_per_hour, contact_number) VALUES ('c4ef2c62-8fae-4ff5-9d26-4f402ec1503d', 'ghandi@example.com', '["ROLE_USER"]', '$2y$13$GukwSl1pfxVZwlQGV1cS4.rH3S1GWFa.pwO.1NKdMJ3IELSAXnHm2', 'Bob', 'Harris', 'https://media.publit.io/file/Canva-Man-Wearing-Pink-Turban-Headdress-Smiling.jpg', 0.00, '0452514521');


create table scheduled_shift
(
    id           char(36)     not null comment '(DC2Type:uuid)'
        primary key,
    on_duty_id   char(36)     null comment '(DC2Type:uuid)',
    start        datetime     not null,
    end          datetime     not null,
    shift_status varchar(255) not null,
    is_approved  tinyint(1)   not null,
    constraint FK_E776626E7CB2CD68
        foreign key (on_duty_id) references user (id)
)
    collate = utf8mb4_unicode_ci;

INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('018ad60c-21e3-44ed-b965-702ce7a1005f', 'c4ef2c62-8fae-4ff5-9d26-4f402ec1503d', '2020-10-10 06:00:21', '2020-10-10 15:00:21', 'secondary', 1);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('07d561e9-be2b-4e00-aa66-03de964018cf', '3a67bfb7-6535-4c05-9061-e33433b58187', '2020-10-11 06:30:21', '2020-10-11 15:00:21', 'primary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('287725f7-fe1b-41da-80c8-59af44706f31', 'b73bcd64-72a1-4bf8-b15d-be0e89195a4b', '2020-09-30 05:33:22', '2020-09-30 17:33:22', 'secondary', 1);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('382c7c0b-49fe-4a45-a245-176e57691a43', '3a67bfb7-6535-4c05-9061-e33433b58187', '2020-10-15 21:00:17', '2020-10-16 03:00:17', 'secondary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('451735e2-f000-4105-b35a-1b81a96ae7a2', 'c4ef2c62-8fae-4ff5-9d26-4f402ec1503d', '2020-10-07 07:30:52', '2020-10-07 15:00:52', 'primary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('49bca970-02cf-4c43-86bc-4002a56b4411', '0dc6dc94-236f-4f25-9d82-2d2453baeffc', '2020-10-09 06:00:21', '2020-10-09 15:00:21', 'secondary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('50d13c5d-3db2-4b7c-9ba3-f9988dda4391', '3a67bfb7-6535-4c05-9061-e33433b58187', '2020-10-10 08:00:12', '2020-10-07 17:23:50', 'primary', 1);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('53dc89e7-0e16-4668-bb79-c3de24538425', 'b73bcd64-72a1-4bf8-b15d-be0e89195a4b', '2020-10-14 09:00:38', '2020-10-14 17:00:38', 'secondary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('55685a26-110f-49c3-8b90-40b3525d17ad', 'a3e759f3-5eaa-46a1-bf92-7e8ed75f122b', '2020-10-10 06:00:21', '2020-10-10 15:00:21', 'primary', 1);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('85317526-f60a-414d-9957-38f64f435bd0', 'c4ef2c62-8fae-4ff5-9d26-4f402ec1503d', '2020-10-13 09:00:00', '2020-10-13 17:00:00', 'secondary', 0);
INSERT INTO scheduled_shift (id, on_duty_id, start, end, shift_status, is_approved) VALUES ('f3c1080d-7fd2-4229-941d-a826459cc777', 'a3e759f3-5eaa-46a1-bf92-7e8ed75f122b', '2020-10-10 08:00:12', '2020-10-07 17:23:50', 'primary', 0);

create table shift_comments
(
    id              char(36)     not null comment '(DC2Type:uuid)'
        primary key,
    shift_id        char(36)     null comment '(DC2Type:uuid)',
    comment         varchar(255) not null,
    date_of_comment datetime     not null,
    authored_by_id  char(36)     null comment '(DC2Type:uuid)',
    constraint FK_762A0E8E22BF0A45
        foreign key (authored_by_id) references user (id),
    constraint FK_762A0E8EBB70BC0E
        foreign key (shift_id) references scheduled_shift (id)
)
    collate = utf8mb4_unicode_ci;

create index IDX_762A0E8E22BF0A45
    on shift_comments (authored_by_id);

create index IDX_762A0E8EBB70BC0E
    on shift_comments (shift_id);

INSERT INTO shift_comments (id, shift_id, comment, date_of_comment, authored_by_id, recipient_id) VALUES ('48b20ea4-e5ce-4714-a817-6946a8099947', '287725f7-fe1b-41da-80c8-59af44706f31', 'Nah was ok', '2020-10-09 03:30:09', 'b73bcd64-72a1-4bf8-b15d-be0e89195a4b', null);
INSERT INTO shift_comments (id, shift_id, comment, date_of_comment, authored_by_id, recipient_id) VALUES ('4d903b14-8b33-43fd-bfbf-9fe17f425937', '287725f7-fe1b-41da-80c8-59af44706f31', 'Shift was way too long', '2020-10-09 03:27:17', 'b73bcd64-72a1-4bf8-b15d-be0e89195a4b', null);
INSERT INTO shift_comments (id, shift_id, comment, date_of_comment, authored_by_id, recipient_id) VALUES ('a454af8a-179f-4afc-b55b-e144f20eaf26', '07d561e9-be2b-4e00-aa66-03de964018cf', 'I ate the last cookies in the cupboard... SORRY!', '2020-10-07 15:00:00', '3a67bfb7-6535-4c05-9061-e33433b58187', null);
INSERT INTO shift_comments (id, shift_id, comment, date_of_comment, authored_by_id, recipient_id) VALUES ('b0a9cf23-07d6-4416-bbf7-12d90913ffbc', '85317526-f60a-414d-9957-38f64f435bd0', 'Have Fun!', '2020-10-12 11:43:50', 'b73bcd64-72a1-4bf8-b15d-be0e89195a4b', null);
