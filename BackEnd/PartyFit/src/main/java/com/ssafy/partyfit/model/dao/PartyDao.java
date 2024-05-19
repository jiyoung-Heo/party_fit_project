package com.ssafy.partyfit.model.dao;

import java.util.List;

import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.User;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberCount;

public interface PartyDao {
	List<PartyMemberCount> selectPartyWithCondition(SearchCondition condition);
	int insertParty(Party party);
	
}
