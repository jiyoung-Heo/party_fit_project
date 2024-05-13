package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Article {
    private int articleId;
    private String title;
    private String content;
    private Date regDate;
    private Date modDate;
    private int viewCount;
    private int category;
    private int userId;
    private int partyId;

    // 생성자, getter 및 setter 생략 (필요에 따라 추가할 수 있음)
}
