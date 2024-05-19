package com.ssafy.partyfit.model.dto;

import java.util.Date;

import lombok.Data;

@Data
public class Party {
	private int partyId;
	private String name;
	private String introduction;
	private String introductionImage; 
	private String bannerImage; 
	private Date regDate;
	private Date modDate;
	private String exerciseCategory;
	private String partyType;
}
