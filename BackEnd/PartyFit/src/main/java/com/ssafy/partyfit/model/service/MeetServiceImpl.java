package com.ssafy.partyfit.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.MeetDao;
import com.ssafy.partyfit.model.dto.Meet;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.User;

@Service
@Transactional
public class MeetServiceImpl implements MeetService {
	private MeetDao meetDao;

	public MeetServiceImpl(MeetDao meetDao) {
		this.meetDao = meetDao;
	}

	@Override
	public List<Meet> showMeet(Map<String, Object> map) {
		return meetDao.selectMeet(map);
	}

	@Override
	public int makeMeet(Meet meet) {
		return meetDao.insertMeet(meet);
	}

	@Override
	public List<Meet> showMyMeet(User user) {
		return meetDao.selectMyMeet(user);
	}

	@Override
	public int manageCreateMeet(int meetId, boolean isaccept) {
		int result;
		if (isaccept) {
			result = meetDao.approveMeet(meetId);
		} else {
			result = meetDao.refuseMeet(meetId);
		}
		return result;
	}

	@Override
	public List<Meet> showNonWriteReview(int userId) {
		return meetDao.selectNonWriteReview(userId);
	}

	@Override
	public int meetMemberCount(int meetId) {
		return meetDao.meetMemberCount(meetId);
	}

	@Override
	public int joinRequest(Map<String, Object> map) {
		return meetDao.joinRequest(map);
	}

	@Override
	public List<User> showMeetMember(int meetId) {
		return meetDao.selectMeetMember(meetId);
	}

	@Override
	public int deleteRequest(Map<String, Object> map) {
		return meetDao.deleteRequest(map);
	}

	@Override
	public int lastMeetId() {
		return meetDao.lastMeetId();
	}

	@Override
	public Meet selectMeetData(int meetId) {
		return meetDao.selectMeetData(meetId);
	}

	@Override
	public List<Meet> selectAllMeetForUser(int userId) {
		return meetDao.selectAllMeetForUser(userId);
	}
	
	

}
