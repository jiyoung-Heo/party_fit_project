package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ArticleUser {
    private int articleId;
    private String title;
    private String content;
    private Date regDate;
    private Date modDate;
    private int viewCount;
    private int category;
    private int userId;
    private int partyId;
    
	private String name;
	private String loginId;
	private String password;
	private String username;
	private String email;
	private String profile;
	private char deleteYn;
	private int age;

}
