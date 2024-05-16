package com.ssafy.partyfit.model.dto;

import lombok.Data;

@Data
public class Likes {
	private int likesId;
    private String userId;
    private String targetId;
}
