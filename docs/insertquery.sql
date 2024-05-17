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
('요가그룹', '요가를 사랑하는 사람들의 모임입니다.', 'https://previews.123rf.com/images/tomi43/tomi432403/tomi43240311354/228343089-logo-design-of-people-doing-yoga-symbol-icon-illustration-vector.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1q80WOLapeGGdo3Op9pm7sErNaTCj_c9olw&s', '요가', '0'),
('헬스그룹', '헬스를 좋아하는 사람들의 모임입니다.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT11G2J7dHvC-MYI1Tv9NuWoDHcxBPr8Xzfa-Dl3ajM3mVsrmLV07QMR4KopQ&s', 'https://example.com/banner1.jpg', '헬스', '0'),
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

-- 게시글 더미 데이터 (파티 1에만 추가) 
INSERT INTO article (title, content, reg_date, mod_date, view_count, map_json, category, delete_yn, user_id, party_id, meet_id)
VALUES
('<공지사항>운동 전 중요 사항 공지', '운동 전 필수적으로 알아야 할 중요 사항을 공지합니다.', '2024-05-01 09:00:00', NULL, 120, '{"latitude": 37.5665, "longitude": 126.9780}', 2, 'N', 1, 1, NULL),
('<공지사항>운동 시 안전 수칙 공지', '운동 시 지켜야 할 안전 수칙에 대해 공지합니다.', '2024-05-02 14:00:00', NULL, 250, '{"latitude": 37.4847, "longitude": 126.9723}', 2, 'N', 2, 1, NULL),
('<공지사항>운동 전 준비 운동 안내', '운동 전 필요한 준비 운동에 대해 안내합니다.', '2024-05-03 17:30:00', NULL, 380, '{"latitude": 37.5511, "longitude": 126.9867}', 2, 'N', 3, 1, NULL),
('<공지사항>운동 중 긴장 완화 방법 공지', '운동 중 긴장을 완화하는 방법에 대해 공지합니다.', '2024-05-04 11:45:00', NULL, 410, '{"latitude": 37.4970, "longitude": 127.0276}', 2, 'N', 4, 1, NULL),
('<공지사항>운동 후 스트레칭 방법 공지', '운동 후 필요한 스트레칭 방법에 대해 공지합니다.', '2024-05-05 13:00:00', NULL, 320, '{"latitude": 37.5665, "longitude": 126.9780}', 2, 'N', 1, 1, NULL),
('<공지사항>운동 중 수분 보충 방법 공지', '운동 중 수분을 보충하는 방법에 대해 공지합니다.', '2024-05-06 08:00:00', NULL, 180, '{"latitude": 37.4847, "longitude": 126.9723}', 2, 'N', 2, 1, NULL),
('<공지사항>운동 중 쉬는 시간의 중요성 공지', '운동 중 적절한 쉬는 시간에 대해 공지합니다.', '2024-05-07 10:30:00', NULL, 290, '{"latitude": 37.5511, "longitude": 126.9867}', 2, 'N', 3, 1, NULL),
('<공지사항>운동 후 올바른 식사 공지', '운동 후 올바른 식사 방법에 대해 공지합니다.', '2024-05-08 16:20:00', NULL, 360, '{"latitude": 37.4970, "longitude": 127.0276}', 2, 'N', 4, 1, NULL),
('<공지사항>운동 전 건강 체크 공지', '운동 전 건강 체크를 하는 방법에 대해 공지합니다.', '2024-05-09 15:00:00', NULL, 240, '{"latitude": 37.5665, "longitude": 126.9780}', 2, 'N', 1, 1, NULL),
('<공지사항>운동 후 샤워의 중요성 공지', '운동 후 적절한 샤워 방법에 대해 공지합니다.', '2024-05-10 12:10:00', NULL, 190, '{"latitude": 37.4847, "longitude": 126.9723}', 2, 'N', 2, 1, NULL),
('<공지사항>운동 중 명상의 효과 공지', '운동 중 명상을 하는 효과에 대해 공지합니다.', '2024-05-11 19:00:00', NULL, 280, '{"latitude": 37.5511, "longitude": 126.9867}', 2, 'N', 3, 1, NULL),
('<공지사항>운동 후 충분한 휴식 공지', '운동 후 충분한 휴식의 중요성에 대해 공지합니다.', '2024-05-12 07:30:00', NULL, 370, '{"latitude": 37.4970, "longitude": 127.0276}', 2, 'N', 4, 1, NULL),
('<공지사항>운동 전 스트레칭 방법 공지', '운동 전 필요한 스트레칭 방법에 대해 공지합니다.', '2024-05-13 14:45:00', NULL, 220, '{"latitude": 37.5665, "longitude": 126.9780}', 2, 'N', 1, 1, NULL),
('<공지사항>운동 중 올바른 자세 공지', '운동 중 올바른 자세에 대해 공지합니다.', '2024-05-14 11:20:00', NULL, 330, '{"latitude": 37.4847, "longitude": 126.9723}', 2, 'N', 2, 1, NULL),
('<공지사항>운동 후 자외선 차단 공지', '운동 후 적절한 자외선 차단 방법에 대해 공지합니다.', '2024-05-15 18:00:00', NULL, 430, '{"latitude": 37.5511, "longitude": 126.9867}', 2, 'N', 3, 1, NULL);


   INSERT INTO article (title, content, reg_date, mod_date, view_count, map_json, category, delete_yn, user_id, party_id, meet_id)
VALUES
('<자유>운동 일지', '오늘은 근육 풀기를 했습니다.', '2024-05-01 09:00:00', NULL, 120, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>헬스장 후기', '헬스장을 방문한 후기입니다.', '2024-05-02 14:00:00', NULL, 250, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL),
('<자유>새로운 운동 장비 소개', '오늘 새로운 운동 장비를 소개합니다.', '2024-05-03 17:30:00', NULL, 380, '{"latitude": 37.5511, "longitude": 126.9867}', 0, 'N', 3, 1, NULL),
('<자유>운동 동기 부여', '오늘은 운동 동기 부여 방법에 대해 이야기해봅니다.', '2024-05-04 11:45:00', NULL, 410, '{"latitude": 37.4970, "longitude": 127.0276}', 0, 'N', 4, 1, NULL),
('<자유>다이어트 팁 공유', '효과적인 다이어트 팁을 공유합니다.', '2024-05-05 13:00:00', NULL, 320, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>운동 스케줄 관리', '운동 스케줄을 잘 관리하는 방법에 대해 공유합니다.', '2024-05-06 08:00:00', NULL, 180, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL),
('<자유>운동하는 날씨', '운동하기 좋은 날씨에 대해 이야기합니다.', '2024-05-07 10:30:00', NULL, 290, '{"latitude": 37.5511, "longitude": 126.9867}', 0, 'N', 3, 1, NULL),
('<자유>운동 성과 공유', '오늘의 운동 성과를 공유합니다.', '2024-05-08 16:20:00', NULL, 360, '{"latitude": 37.4970, "longitude": 127.0276}', 0, 'N', 4, 1, NULL),
('<자유>하체 운동 추천', '효과적인 하체 운동을 추천합니다.', '2024-05-09 15:00:00', NULL, 240, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>상체 운동 루틴', '상체 운동 루틴에 대해 공유합니다.', '2024-05-10 12:10:00', NULL, 190, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL),
('<자유>스트레칭 요법', '효과적인 스트레칭 방법을 소개합니다.', '2024-05-11 19:00:00', NULL, 280, '{"latitude": 37.5511, "longitude": 126.9867}', 0, 'N', 3, 1, NULL),
('<자유>운동 식단 관리', '운동 식단을 어떻게 관리할지에 대해 이야기합니다.', '2024-05-12 07:30:00', NULL, 370, '{"latitude": 37.4970, "longitude": 127.0276}', 0, 'N', 4, 1, NULL),
('<자유>스트레스 해소 운동', '스트레스를 해소할 수 있는 운동 방법에 대해 공유합니다.', '2024-05-13 14:45:00', NULL, 220, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>운동 장비 사용법', '운동 장비를 올바르게 사용하는 방법을 소개합니다.', '2024-05-14 11:20:00', NULL, 330, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL),
('<자유>운동 후 회복법', '운동 후의 회복 방법에 대해 이야기합니다.', '2024-05-15 18:00:00', NULL, 430, '{"latitude": 37.5511, "longitude": 126.9867}', 0, 'N', 3, 1, NULL),
('<자유>운동 명언 공유', '운동에 대한 명언을 공유합니다.', '2024-05-16 13:50:00', NULL, 210, '{"latitude": 37.4970, "longitude": 127.0276}', 0, 'N', 4, 1, NULL),
('<자유>자전거 타기 추천', '자전거 타기 좋은 장소와 추천을 소개합니다.', '2024-05-17 10:15:00', NULL, 300, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>산책로 안내', '산책하기 좋은 길을 안내합니다.', '2024-05-18 09:40:00', NULL, 400, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL),
('<자유>축구 경기 후기', '축구 경기 후기를 공유합니다.', '2024-05-19 14:00:00', NULL, 260, '{"latitude": 37.5511, "longitude": 126.9867}', 0, 'N', 3, 1, NULL),
('<자유>야구 공략법', '야구를 할 때 유용한 공략법을 소개합니다.', '2024-05-20 16:30:00', NULL, 350, '{"latitude": 37.4970, "longitude": 127.0276}', 0, 'N', 4, 1, NULL),
('<자유>테니스 스킬 강화', '테니스 스킬을 강화하는 방법을 공유합니다.', '2024-05-21 12:20:00', NULL, 230, '{"latitude": 37.5665, "longitude": 126.9780}', 0, 'N', 1, 1, NULL),
('<자유>수영 기술 개선', '수영 기술을 개선하는 방법을 소개합니다.', '2024-05-22 17:00:00', NULL, 320, '{"latitude": 37.4847, "longitude": 126.9723}', 0, 'N', 2, 1, NULL);
         
  INSERT INTO article (title, content, reg_date, mod_date, view_count, map_json, category, delete_yn, user_id, party_id, meet_id)
VALUES
('<가입인사>안녕하세요! 처음 글 남겨봅니다.', '안녕하세요! 파티에 가입한 지 얼마 안 되었습니다. 잘 부탁드립니다!', '2024-05-01 09:00:00', NULL, 120, '{"latitude": 37.5665, "longitude": 126.9780}', 1, 'N', 1, 1, NULL),
('<가입인사>파티원 여러분 반갑습니다!', '이번에 파티에 합류하게 되어서 반가워요. 다양한 활동 함께해요!', '2024-05-02 14:00:00', NULL, 250, '{"latitude": 37.4847, "longitude": 126.9723}', 1, 'N', 2, 1, NULL),
('<가입인사>안녕하세요! 파티 가입한 지 얼마 안 됐습니다.', '다 같이 재밌고 즐거운 시간 보내요!', '2024-05-03 17:30:00', NULL, 380, '{"latitude": 37.5511, "longitude": 126.9867}', 1, 'N', 3, 1, NULL),
('<가입인사>파티에 가입한 지 얼마 안 됐습니다!', '파티원 여러분 반가워요. 함께 활동하며 즐거운 시간 보내요!', '2024-05-04 11:45:00', NULL, 410, '{"latitude": 37.4970, "longitude": 127.0276}', 1, 'N', 4, 1, NULL),
('<가입인사>안녕하세요! 파티 가입한 지 얼마 안 됐습니다.', '새로 합류한 파티원입니다. 잘 부탁드려요!', '2024-05-05 13:00:00', NULL, 320, '{"latitude": 37.5665, "longitude": 126.9780}', 1, 'N', 1, 1, NULL),
('<가입인사>파티원 여러분 안녕하세요!', '파티에 합류하게 되어서 반가워요. 같이 다양한 활동 하면서 친해져요!', '2024-05-06 08:00:00', NULL, 180, '{"latitude": 37.4847, "longitude": 126.9723}', 1, 'N', 2, 1, NULL),
('<가입인사>안녕하세요! 파티원 여러분.', '파티에 가입하게 되어서 반가워요. 잘 부탁드립니다!', '2024-05-07 10:30:00', NULL, 290, '{"latitude": 37.5511, "longitude": 126.9867}', 1, 'N', 3, 1, NULL),
('<가입인사>안녕하세요! 파티 가입한 지 얼마 안 됐습니다.', '함께 즐거운 시간 보내요!', '2024-05-08 16:20:00', NULL, 360, '{"latitude": 37.4970, "longitude": 127.0276}', 1, 'N', 4, 1, NULL),
('<가입인사>파티원 여러분 안녕하세요!', '새로 가입한 파티원입니다. 함께 다양한 활동 하면서 잘 지내요!', '2024-05-09 15:00:00', NULL, 240, '{"latitude": 37.5665, "longitude": 126.9780}', 1, 'N', 1, 1, NULL),
('<가입인사>안녕하세요! 파티원 여러분.', '파티 가입하게 되어서 반가워요. 다양한 활동 하면서 즐거운 시간 보내요!', '2024-05-10 12:10:00', NULL, 190, '{"latitude": 37.4847, "longitude": 126.9723}', 1, 'N', 2, 1, NULL),
('<가입인사>파티에 가입한 지 얼마 안 됐습니다.', '새로 합류한 파티원입니다. 함께 즐겁고 재미있게 활동합시다!', '2024-05-11 19:00:00', NULL, 280, '{"latitude": 37.5511, "longitude": 126.9867}', 1, 'N', 3, 1, NULL),
('<가입인사>안녕하세요! 파티원 여러분.', '함께 다양한 활동 하면서 즐거운 시간 보내요!', '2024-05-12 07:30:00', NULL, 370, '{"latitude": 37.4970, "longitude": 127.0276}', 1, 'N', 4, 1, NULL),
('<가입인사>파티원 여러분 안녕하세요!', '새로 가입한 파티원입니다. 함께 즐거운 시간 보내요!', '2024-05-13 14:45:00', NULL, 220, '{"latitude": 37.5665, "longitude": 126.9780}', 1, 'N', 1, 1, NULL),
('<가입인사>안녕하세요! 파티원 여러분.', '파티에 가입하게 되어서 반가워요. 잘 부탁드립니다!', '2024-05-14 11:20:00', NULL, 330, '{"latitude": 37.4847, "longitude": 126.9723}', 1, 'N', 2, 1, NULL),
('<가입인사>파티원 여러분 안녕하세요!', '파티에 합류하게 되어서 반가워요. 함께 활동하며 잘 지내요!', '2024-05-15 18:00:00', NULL, 430, '{"latitude": 37.5511, "longitude": 126.9867}', 1, 'N', 3, 1, NULL);

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

