package com.ssafy.partyfit.model.dao;

import java.util.List;

import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.Party;

public interface PartyDao {
	List<Party> selectAllParty(SearchCondition condition);
	int insertParty(Party party);
}
