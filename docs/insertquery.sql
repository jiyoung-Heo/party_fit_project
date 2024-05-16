-- 사용자 더미 데이터
INSERT INTO user (name, login_id, password, username, email, age, profile) VALUES
('홍길동', 'hong', 'password1', '길동', 'hong@example.com', 25, 'profile1.jpg'),
('김철수', 'kim', 'password2', '철수', 'kim@example.com', 30, 'profile2.jpg'),
('이영희', 'lee', 'password3', '영희', 'lee@example.com', 27, 'profile3.jpg');

-- 그룹 더미 데이터
INSERT INTO party (name, introduction, introduction_image, exercise_category, party_type) VALUES
('헬스그룹', '헬스를 좋아하는 사람들의 모임입니다.', 'intro1.jpg', '헬스', '0'),
('요가그룹', '요가를 사랑하는 사람들의 모임입니다.', 'intro2.jpg', '요가', '1');

-- 모임 더미 데이터
INSERT INTO meet (title, content, max_headcount, start_time, end_time, status, party_id) VALUES
('첫번째 모임', '첫번째 모임 내용입니다.', 10, NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), '1', 1),
('두번째 모임', '두번째 모임 내용입니다.', 20, NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), '2', 2);

-- 모임 멤버 더미 데이터
INSERT INTO meet_member (user_id, meet_id) VALUES
(1, 1),
(2, 2);

-- 그룹 멤버 더미 데이터
INSERT INTO party_member (grade, status, user_id, party_id) VALUES
('0', '1', 1, 1),
('1', '1', 2, 2);

-- 일정 더미 데이터
INSERT INTO schedule (title, content, start_time, end_time, place, user_id) VALUES
('첫번째 일정', '첫번째 일정 내용입니다.', NOW(), DATE_ADD(NOW(), INTERVAL 2 HOUR), '서울', 1),
('두번째 일정', '두번째 일정 내용입니다.', NOW(), DATE_ADD(NOW(), INTERVAL 3 HOUR), '부산', 2);

-- 게시글 더미 데이터
INSERT INTO article (title, content, reg_date, view_count, map_json, category, delete_yn, user_id, party_id, meet_id) VALUES
('첫번째 게시글', '첫번째 게시글 내용입니다.', NOW(), 0, '{"lat":37.5665,"lng":126.9780}', 0, 'N', 1, 1, 1),
('두번째 게시글', '두번째 게시글 내용입니다.', NOW(), 0, '{"lat":37.5665,"lng":126.9780}', 1, 'N', 2, 2, 2),
('세번째 게시글', '세번째 게시글 내용입니다.', NOW(), 0, '{"lat":37.5665,"lng":126.9780}', 2, 'N', 3, 1, 1);


-- 게시글 좋아요 더미 데이터
INSERT INTO article_likes (user_id, article_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- 댓글 더미 데이터
INSERT INTO comment (content, reg_date, parent_id, depth, seq, delete_yn, user_id, article_id) VALUES
('첫번째 댓글입니다.', NOW(), 1, 1, 1, 'N', 1, 1),
('두번째 댓글입니다.', NOW(), 1, 1, 2, 'N', 2, 2),
('세번째 댓글입니다.', NOW(), 1, 1, 3, 'N', 3, 3);

-- 댓글 좋아요 더미 데이터
INSERT INTO comment_likes (comment_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- 이미지 더미 데이터
INSERT INTO image (file_name, uuid, upload_Path, article_id) VALUES
('image1.jpg', 'uuid1', '/uploads/', 1),
('image2.jpg', 'uuid2', '/uploads/', 2),
('image3.jpg', 'uuid3', '/uploads/', 3);
