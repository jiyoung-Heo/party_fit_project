-- 사용자 더미 데이터
INSERT INTO user (name, login_id, password, username, email, age, profile, delete_yn) VALUES
('홍길동', 'hong', 'password1', '길동', 'hong@example.com', 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-JdoMKl_cBoE-qqWZjn7OH-dvmZK73uVZ9w&s', 'N'),
('김철수', 'kim', 'password2', '철수', 'kim@example.com', 30, 'profile2.jpg', 'N'),
('이영희', 'lee', 'password3', '영희', 'lee@example.com', 27, 'profile3.jpg', 'N'),
('박민지', '1234', '1234', '민지야', 'parkmj@example.com', 25, 'https://example.com/profile4.jpg', 'N'),
('1번 파티 운영진', 'jung', 'password', '1번파티 운영진', 'jungsbin@example.com', 32, NULL, 'N');

-- 그룹 더미 데이터

INSERT INTO party (name, introduction, introduction_image, banner_image, exercise_category, party_type)
VALUES
('헬스그룹', '헬스를 좋아하는 사람들의 모임입니다.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11G2J7dHvC-MYI1Tv9NuWoDHcxBPr8Xzfa-Dl3ajM3mVsrmLV07QMR4KopQ&s', 'https://example.com/banner1.jpg', '헬스', '0'),
('요가그룹', '요가를 사랑하는 사람들의 모임입니다.', 'https://previews.123rf.com/images/tomi43/tomi432403/tomi43240311354/228343089-logo-design-of-people-doing-yoga-symbol-icon-illustration-vector.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1q80WOLapeGGdo3Op9pm7sErNaTCj_c9olw&s', '요가', '0'),
('필라테스그룹', '필라테스를 즐기는 사람들의 모임입니다.', 'https://previews.123rf.com/images/aryabm/aryabm2402/aryabm240200327/226705451-pilates-logo-vector-body-poses-gymnastics-exercise-yoga-calm-down-template-illustration.jpg',
 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5v3_YApd7vK9A5HjGnqijUEZyzhtp7y0idQ&s', '필라테스', '0'),
('클라이밍그룹', '클라이밍을 사랑하는 사람들의 모임입니다.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNIkARNVTA8tiE-oy2yEJrOcD1JGe4SLSdrg&s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_GDxB0aNWDU_vQsCc-eo0GpjnMmPpZ8VI7A&s', '클라이밍', '0');


-- 모임 더미 데이터
INSERT INTO meet (title, content, max_headcount, start_time, end_time, status, party_id)
VALUES
('헬스그룹 모임', '헬스그룹에서 함께 운동하는 시간입니다. (모집중)', 10, '2024-06-01 10:00:00', '2024-06-01 12:00:00', '1', 1),
('요가그룹 모임', '요가그룹의 힐링 타임입니다. (모집중)', 8, '2024-06-02 18:00:00', '2024-06-02 20:00:00', '1', 2),
('필라테스그룹 모임', '필라테스그룹과 함께 몸매를 관리하세요. (승인대기중)', 6, '2024-06-03 14:00:00', '2024-06-03 16:00:00', '0', 3),
('클라이밍그룹 모임', '클라이밍그룹과 함께 도전하세요. (정원마감)', 5, '2024-06-04 13:00:00', '2024-06-04 15:00:00', '2', 4),
('요가그룹 추가 모임', '요가그룹의 심화 수업입니다. (모집중)', 6, '2024-06-05 17:00:00', '2024-06-05 19:00:00', '1', 2);

-- 모임 멤버 더미 데이터
INSERT INTO meet_member (user_id, meet_id)
VALUES
(1, 1),
(2, 1),
(4, 1),
(4, 3),
(4, 2);

-- 데이터 삽입
INSERT INTO party_member (grade, status, user_id, party_id)
VALUES
('0', '1', 1, 1), -- 일반 회원, 가입승인
('0', '1', 2, 1), -- 일반 회원, 가입승인
('0', '1', 4, 2), -- 일반 회원, 가입승인
('0', '1', 4, 3), -- 일반 회원, 가입승인
('0', '1', 4, 1), -- 일반 회원, 가입승인
('1', '1', 5, 1); -- 운영진, 가입승인


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
INSERT INTO article_likes (user_id, target_id) VALUES
(1, 1),
(2, 2),
(3, 3);


-- 댓글 더미 데이터
INSERT INTO comment (content, reg_date, parent_id, depth, seq, delete_yn, user_id, article_id) VALUES
('첫번째 댓글입니다.', NOW(), 1, 1, 1, 'N', 1, 1),
('두번째 댓글입니다.', NOW(), 1, 1, 2, 'N', 2, 2),
('세번째 댓글입니다.', NOW(), 1, 1, 3, 'N', 3, 3);

-- 댓글 좋아요 더미 데이터
INSERT INTO comment_likes (target_id, user_id) VALUES
(1, 1),
(2, 2),
(3, 3);

-- 이미지 더미 데이터
INSERT INTO image (file_name, uuid, upload_Path, article_id) VALUES
('image1.jpg', 'uuid1', '/uploads/', 1),
('image2.jpg', 'uuid2', '/uploads/', 2),
('image3.jpg', 'uuid3', '/uploads/', 3);

