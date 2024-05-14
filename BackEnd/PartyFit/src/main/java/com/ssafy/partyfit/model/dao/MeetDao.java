package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Meet;

public interface MeetDao {
	List<Meet> selectMeet(Map<String, Object> map);
	
}
