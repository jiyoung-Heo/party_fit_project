package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PartyMember {
	private int partyMemberId;
	private String grade;
	private String status;
	private int userId;
	private int partyId;
    private Date regDate;
}
