package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Comment {
	private int commentId;
	private String content;
	private Date regDate;
	private Date modDate;
	private int likes;
	private int topId;
	private int depth;
	private int seq;
	private String deleteYn;
	private int userId;
	private int articleId;
	
}