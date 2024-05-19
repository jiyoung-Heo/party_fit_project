package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class PartyMemberCount {
	private int partyId;
	private String name;
	private String introduction;
	private String introductionImage;
	private Date regDate;
	private Date modDate;
	private String exerciseCategory;
	private String partyType;
	private int memberCount;
	
}
