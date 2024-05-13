package com.ssafy.partyfit.model.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.partyfit.model.dao.PartyDao;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.Party;

@Service
public class PartyServiceImpl implements PartyService {
	private PartyDao partyDao;

	public PartyServiceImpl(PartyDao partyDao) {
		this.partyDao = partyDao;
	}
	
	@Override
	public List<Party> showParty(SearchCondition condition) {
		return partyDao.selectAllParty(condition);

	};

}
