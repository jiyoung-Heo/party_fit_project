package com.ssafy.partyfit.model.dto;

import lombok.Data;

@Data
public class PartyMemberUser {
	private String username;
	private int age;
	private String loginId;
	private int grade;
	private int status;
}
