
CREATE TABLE article
(
  article_id INT           NOT NULL AUTO_INCREMENT COMMENT '게시글 아이디',
  title      VARCHAR(4000) NOT NULL COMMENT '게시글 제목',
  content    VARCHAR(4000) NOT NULL COMMENT '게시글 내용',
  reg_date   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  mod_date   DATETIME      NULL     COMMENT '수정일',
  view_count INT           NOT NULL DEFAULT '0' COMMENT '조회수',
  catagory   VARCHAR(10)   NOT NULL COMMENT '게시판 종류(0:자유게시판, 1: 가입인사, 2:공지사항)',
  user_id    INT           NOT NULL COMMENT 'user pk',
  party_id   INT           NOT NULL COMMENT '그룹 pk',
  PRIMARY KEY (article_id)
) COMMENT '게시글';

CREATE TABLE comment
(
  comment_id INT           NOT NULL AUTO_INCREMENT COMMENT '댓글 아이디',
  content    VARCHAR(1000) NOT NULL COMMENT '댓글 내용',
  reg_date   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '작성일',
  mod_date   DATETIME      NULL     COMMENT '수정일',
  likes      INT           NOT NULL DEFAULT 0 COMMENT '좋아요',
  depth      INT           NOT NULL COMMENT '댓글/대댓글관련',
  seq        INT           NOT NULL COMMENT '댓글/대댓글관련',
  delete_yn  VARCHAR(1)    NOT NULL DEFAULT 'N' COMMENT '삭제유무',
  user_id    INT           NOT NULL COMMENT 'user pk',
  article_id INT           NOT NULL COMMENT '게시글 아이디',
  PRIMARY KEY (comment_id)
) COMMENT '댓글 ';

CREATE TABLE image
(
  image_id    INT           NOT NULL AUTO_INCREMENT COMMENT 'image pk',
  file_name   VARCHAR(1000) NOT NULL COMMENT '이미지 저장 경로',
  uuid        VARCHAR(1000) NOT NULL COMMENT '이미지 고유번호',
  upload_Path VARCHAR(1000) NOT NULL COMMENT '업로드위치',
  review_id   int           NOT NULL COMMENT 'review pk',
  PRIMARY KEY (image_id)
) COMMENT '사진저장할테이블';

CREATE TABLE meet
(
  meet_id       INT           NOT NULL AUTO_INCREMENT COMMENT 'meet pk',
  title         VARCHAR(100)  NOT NULL COMMENT '제목',
  content       VARCHAR(4000) NOT NULL COMMENT '내용',
  max_headcount INT           NOT NULL COMMENT '가입 정원',
  start_time    DATETIME      NOT NULL COMMENT '시작날짜, 시간',
  end_time      DATETIME      NOT NULL COMMENT '끝나는 날짜, 시간',
  status        VARCHAR(1)    NOT NULL DEFAULT '0' COMMENT '모집상태(0: 승인대기중, 1:모집중, 2:정원마감)',
  party_id      INT           NOT NULL COMMENT '그룹 pk',
  PRIMARY KEY (meet_id)
) COMMENT 'partyFit 내부 모임';

CREATE TABLE meet_member_list
(
  meet_member_list_id INT NOT NULL AUTO_INCREMENT COMMENT 'user 고유번호',
  user_id             INT NOT NULL COMMENT 'user pk',
  meet_id             INT NOT NULL COMMENT 'meet pk',
  PRIMARY KEY (meet_member_list_id)
) COMMENT '내부 모임에 참여예정인 회원 리스트 ';

CREATE TABLE party
(
  party_id           INT           NOT NULL AUTO_INCREMENT COMMENT '그룹 pk',
  name               VARCHAR(20)   NOT NULL COMMENT '그룹 이름',
  introduction       VARCHAR(4000) NOT NULL COMMENT '그룹 소개글',
  introduction_image VARCHAR(1000) NULL     COMMENT '그룹 소개 이미지',
  exercise_category  VARCHAR(100)  NOT NULL COMMENT '운동 종류',
  party_type         VARCHAR(1)    NOT NULL DEFAULT '0' COMMENT '그룹종류(0:개인그룹, 1:기업그룹)',
  PRIMARY KEY (party_id)
) COMMENT 'partyFit 그룹';

CREATE TABLE party_member_list
(
  party_member_list_id INT        NOT NULL AUTO_INCREMENT COMMENT 'pk',
  grade                VARCHAR(1) NOT NULL DEFAULT '0' COMMENT '등급(0:일반, 1: 운영진)',
  status               VARCHAR(1) NULL     DEFAULT '0' COMMENT '상태(0: 가입대기중, 1: 가입승인)',
  user_id              INT        NOT NULL COMMENT 'user pk',
  party_id             INT        NOT NULL COMMENT '그룹 pk',
  PRIMARY KEY (party_member_list_id)
) COMMENT 'partyFit  회원관리';

CREATE TABLE review
(
  review_id  int           NOT NULL AUTO_INCREMENT COMMENT 'review pk',
  title      VARCHAR(100)  NOT NULL COMMENT '제목',
  content    VARCHAR(4000) NOT NULL COMMENT '내용',
  reg_date   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  mod_date   DATETIME      NULL     COMMENT '수정일',
  view_count int           NOT NULL DEFAULT 0 COMMENT '조회수',
  likes      int           NOT NULL DEFAULT 0 COMMENT '좋아요',
  map_json   VARCHAR(4000) NULL     COMMENT '지도 데이터',
  meet_id    INT           NOT NULL COMMENT 'meet pk',
  user_id    INT           NOT NULL COMMENT 'user pk',
  PRIMARY KEY (review_id)
) COMMENT '후기';

CREATE TABLE schedule
(
  schedule_id int           NOT NULL AUTO_INCREMENT COMMENT '스케줄 pk',
  title       VARCHAR(100)  NOT NULL COMMENT '제목',
  content     VARCHAR(4000) NOT NULL COMMENT '내용',
  start_time  DATETIME      NOT NULL COMMENT '시작날짜, 시간',
  end_time    DATETIME      NOT NULL COMMENT '끝나는 날짜, 시간',
  place       VARCHAR(4000) NOT NULL COMMENT '운동장소',
  user_id     INT           NOT NULL COMMENT 'user pk',
  PRIMARY KEY (schedule_id)
) COMMENT '개인 일정';

CREATE TABLE user
(
  user_id   INT           NOT NULL AUTO_INCREMENT COMMENT 'user pk',
  name      VARCHAR(20)   NOT NULL COMMENT '이름',
  login_id  VARCHAR(20)   NOT NULL COMMENT '아이디',
  password  VARCHAR(100)  NOT NULL COMMENT '비밀번호',
  username  VARCHAR(20)   NOT NULL COMMENT '닉네임',
  email     VARCHAR(255)  NOT NULL COMMENT '이메일',
  age       INT           NOT NULL COMMENT '나이',
  profile   VARCHAR(1000) NULL     COMMENT '프로필 사진',
  delete_yn VARCHAR(1)    NOT NULL DEFAULT 'N' COMMENT '탈퇴여부',
  PRIMARY KEY (user_id)
) COMMENT '사용자';

ALTER TABLE user
  ADD CONSTRAINT UQ_login_id UNIQUE (login_id);

ALTER TABLE user
  ADD CONSTRAINT UQ_username UNIQUE (username);

ALTER TABLE user
  ADD CONSTRAINT UQ_email UNIQUE (email);

ALTER TABLE meet_member_list
  ADD CONSTRAINT FK_user_TO_meet_member_list
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE meet
  ADD CONSTRAINT FK_party_TO_meet
    FOREIGN KEY (party_id)
    REFERENCES party (party_id);

ALTER TABLE party_member_list
  ADD CONSTRAINT FK_user_TO_party_member_list
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE party_member_list
  ADD CONSTRAINT FK_party_TO_party_member_list
    FOREIGN KEY (party_id)
    REFERENCES party (party_id);

ALTER TABLE article
  ADD CONSTRAINT FK_user_TO_article
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE comment
  ADD CONSTRAINT FK_user_TO_comment
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE comment
  ADD CONSTRAINT FK_article_TO_comment
    FOREIGN KEY (article_id)
    REFERENCES article (article_id);

ALTER TABLE schedule
  ADD CONSTRAINT FK_user_TO_schedule
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE review
  ADD CONSTRAINT FK_meet_TO_review
    FOREIGN KEY (meet_id)
    REFERENCES meet (meet_id);

ALTER TABLE image
  ADD CONSTRAINT FK_review_TO_image
    FOREIGN KEY (review_id)
    REFERENCES review (review_id);

ALTER TABLE review
  ADD CONSTRAINT FK_user_TO_review
    FOREIGN KEY (user_id)
    REFERENCES user (user_id);

ALTER TABLE meet_member_list
  ADD CONSTRAINT FK_meet_TO_meet_member_list
    FOREIGN KEY (meet_id)
    REFERENCES meet (meet_id);

ALTER TABLE article
  ADD CONSTRAINT FK_party_TO_article
    FOREIGN KEY (party_id)
    REFERENCES party (party_id);
