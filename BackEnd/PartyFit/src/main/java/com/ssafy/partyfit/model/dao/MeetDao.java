package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Meet;
import com.ssafy.partyfit.model.dto.User;

public interface MeetDao {
	List<Meet> selectMeet(Map<String, Object> map);

	int insertMeet(Meet meet);

	List<Meet> selectMyMeet(User user);
	
	int approveMeet(int meetId);
	
	int refuseMeet(int meetId);
	
	List<Meet> selectNonWriteReview(int userId);

	int meetMemberCount(int meetId);

	int joinRequest(Map<String, Object> map);
	
	int deleteRequest(Map<String, Object> map);
	
	int lastMeetId();
	Meet selectMeetData(int meetId);


	List<User> selectMeetMember(int meetId);
}
