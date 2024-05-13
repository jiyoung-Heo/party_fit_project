-- 사용자(user) 테이블 더미 데이터
INSERT INTO user (name, login_id, password, username, email, profile) VALUES
('유저1', 'user1', 'password1', 'username1', 'user1@example.com', ''),
('유저2', 'user2', 'password2', 'username2', 'user2@example.com', ''),
('유저3', 'user3', 'password3', 'username3', 'user3@example.com', '');

-- 그룹(party) 테이블 더미 데이터
INSERT INTO party (name, introduction, exercise_catagory, party_type) VALUES
('파티1', '파티1 소개글입니다.', 'A', '0'),
('파티2', '파티2 소개글입니다.', 'B', '1');

-- 파티 회원(party_member_list) 테이블 더미 데이터
INSERT INTO party_member_list (grade, status, user_id, party_id) VALUES
('0', '1', 1, 1),
('1', '1', 2, 1),
('0', '1', 3, 2);

-- 모임(meet) 테이블 더미 데이터
INSERT INTO meet (title, content, max_headcount, start_time, end_time, party_id) VALUES
('첫 번째 모임', '첫 번째 모임 내용입니다.', 10, '2024-05-13 10:00:00', '2024-05-13 12:00:00', 1),
('두 번째 모임', '두 번째 모임 내용입니다.', 15, '2024-05-14 14:00:00', '2024-05-14 16:00:00', 2);

-- 모임 참가자(meet_member_list) 테이블 더미 데이터
INSERT INTO meet_member_list (user_id, meet_id) VALUES
(1, 1),
(2, 1),
(3, 2);

-- 개인 일정(schedule) 테이블 더미 데이터
INSERT INTO schedule (title, content, start_time, end_time, place, user_id) VALUES
('첫 번째 일정', '첫 번째 일정 내용입니다.', '2024-05-13 08:00:00', '2024-05-13 09:00:00', '운동장1', 1),
('두 번째 일정', '두 번째 일정 내용입니다.', '2024-05-14 09:00:00', '2024-05-14 10:00:00', '운동장2', 2);

-- 게시글(article) 테이블 더미 데이터
INSERT INTO article (title, content, category, user_id, party_id) VALUES
('첫 번째 게시글', '첫 번째 게시글 내용입니다.', '0', 1, 1),
('두 번째 게시글', '두 번째 게시글 내용입니다.', '1', 2, 1),
('세 번째 게시글', '세 번째 게시글 내용입니다.', '2', 3, 2);

-- 댓글(Comment) 테이블 더미 데이터
INSERT INTO Comment (content, depth, seq, user_id, article_id) VALUES
('첫 번째 댓글입니다.', 0, 1, 1, 1),
('두 번째 댓글입니다.', 0, 2, 2, 1),
('세 번째 댓글입니다.', 0, 1, 3, 2);

-- 후기(review) 테이블 더미 데이터
INSERT INTO review (title, content, meet_id, user_id) VALUES
('첫 번째 후기', '첫 번째 후기 내용입니다.', 1, 1),
('두 번째 후기', '두 번째 후기 내용입니다.', 2, 2);

-- 이미지(image) 테이블 더미 데이터
INSERT INTO image (file_name, uuid, upload_Path, review_id) VALUES
('image1.jpg', '123456789', '/uploads/', 1),
('image2.jpg', '987654321', '/uploads/', 1),
('image3.jpg', 'abcdef123', '/uploads/', 2);
