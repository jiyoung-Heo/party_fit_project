package com.ssafy.partyfit.model.dto;

import lombok.Data;

@Data
public class SearchCondition {
	private String key;
	private String word;
	private String orderBy;
	private String orderByDir;
}
