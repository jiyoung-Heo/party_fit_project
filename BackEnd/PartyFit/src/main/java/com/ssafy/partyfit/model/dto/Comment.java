package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Comment {
	private int commentId;
	private String content;
	private Date regDate;
	private Date modDate;
	private int parentId;
	private int depth;
	private int seq;
	private String deleteYn;
	private int userId;
	private int articleId;
	private int likesCount;
	private String username;
	private String profile;
}
