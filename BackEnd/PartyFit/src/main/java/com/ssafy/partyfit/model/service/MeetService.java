package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Meet;
import com.ssafy.partyfit.model.dto.PartyMember;
import com.ssafy.partyfit.model.dto.User;

public interface MeetService {
	List<Meet> showMeet(Map<String, Object> map);

	int makeMeet(Meet meet);

	List<Meet> showMyMeet(User user);
	
	int manageCreateMeet(int meetId, boolean isaccept);
	
	List<Meet> showNonWriteReview(int userId);
	
	int meetMemberCount(int meetId);
	
	int joinRequest(Map<String, Object> map);
	
	List<User> showMeetMember(int meetId);
	
}
