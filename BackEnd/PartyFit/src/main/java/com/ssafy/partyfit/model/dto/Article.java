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
    private String mapJson;
    private int category;
    private String deleteYn;
    private int userId;
    private int partyId;
    private int meetId;

}
