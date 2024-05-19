package com.ssafy.partyfit.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.PartyDao;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberCount;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.User;

@Service
@Transactional
public class PartyServiceImpl implements PartyService {
	private PartyDao partyDao;

	public PartyServiceImpl(PartyDao partyDao) {
		this.partyDao = partyDao;
	}
	
	@Override
	public List<PartyMemberCount> showParty(SearchCondition condition) {
		return partyDao.selectPartyWithCondition(condition);

	}

	@Override
	public int makeParty(Party party) {
		return partyDao.insertParty(party);
	}


}
