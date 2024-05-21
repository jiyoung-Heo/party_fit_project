package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PartyMemberUser {
	private int partyMemberId;
	private int userId;
	private String username;
	private int age;
	private String loginId;
	private int grade;
	private int status;
    private Date regDate;
}
