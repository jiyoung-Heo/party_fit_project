-- user 테이블 더미 데이터 삽입
INSERT INTO user (name, login_id, password, username, email, age) VALUES
('홍길동', 'hong123', 'password123', '길동이', 'hong@example.com', 25),
('이순신', 'lee456', 'password456', '신순이', 'lee@example.com', 30),
('유관순', 'you789', 'password789', '순이', 'you@example.com', 22);

-- party 테이블 더미 데이터 삽입
INSERT INTO party (name, introduction, introduction_image, exercise_category, party_type) VALUES
('운동파티', '다함께 운동하는 모임입니다.', 'image1.jpg', '헬스', '0'),
('테니스 클럽', '테니스를 즐기는 그룹입니다.', 'image2.jpg', '테니스', '0'),
('코딩 동아리', '함께 코딩 공부하는 동아리입니다.', NULL, '프로그래밍', '1');

-- article 테이블 더미 데이터
INSERT INTO article (title, content, category, user_id, party_id) VALUES 
('첫 번째 게시글', '첫 번째 게시글 내용입니다.', '0', 1, 1),
('두 번째 게시글', '두 번째 게시글 내용입니다.', '1', 2, 2),
('세 번째 게시글', '세 번째 게시글 내용입니다.', '2', 3, 3);

-- Comment 테이블 더미 데이터
INSERT INTO comment (content, parent_id, depth, seq, user_id, article_id) VALUES 
('첫 번째 댓글입니다.', 1, 1, 1, 1, 1),
('두 번째 댓글입니다.', 1, 1, 2, 2, 1),
('세 번째 댓글입니다.', 1, 1, 3, 3, 2);

-- meet 테이블 더미 데이터 삽입
INSERT INTO meet (title, content, max_headcount, start_time, end_time, status, party_id) VALUES
('파티Fit 모임', '다함께 운동하고 친목을 다지는 모임입니다.', 20, NOW(), NOW(), '1', 1);

-- meet_member 테이블 더미 데이터 삽입
INSERT INTO meet_member (user_id, meet_id) VALUES
(1, 1);

-- review 테이블 더미 데이터 삽입
INSERT INTO review (title, content, reg_date, mod_date, view_count, likes, map_json, meet_id, user_id) VALUES
('파티Fit 모임 후기', '파티Fit 모임에 참여한 후기입니다.', NOW(), NOW(), 15, 3, '{"lat": 37.1234, "lng": 127.5678}', 1, 1);

-- image 테이블 더미 데이터 삽입
INSERT INTO image (file_name, uuid, upload_Path, review_id) VALUES
('image1.jpg', '123456', '/uploads', 1);

-- party_member 테이블 더미 데이터 삽입
INSERT INTO party_member (grade, status, user_id, party_id) VALUES
('0', '1', 1, 1);

-- schedule 테이블 더미 데이터 삽입
INSERT INTO schedule (title, content, start_time, end_time, place, user_id) VALUES
('운동 일정', '오늘은 체육관에서 운동을 합니다.', NOW(), NOW(), '체육관', 1);
