package com.ssafy.partyfit.model.dto;

import lombok.Data;

@Data
public class PartyMemberCount {
	private int partyId;
	private String name;
	private String introduction;
	private String introductionImage; 
	private String exerciseCategory;
	private String partyType;
	private int memberCount;
	
}
