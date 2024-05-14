package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.MeetDao;
import com.ssafy.partyfit.model.dto.Meet;

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

}