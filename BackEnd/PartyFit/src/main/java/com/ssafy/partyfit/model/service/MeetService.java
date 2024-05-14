package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Meet;

public interface MeetService {
	List<Meet> showMeet(Map<String, Object> map);
	int makeMeet(Meet meet);
}