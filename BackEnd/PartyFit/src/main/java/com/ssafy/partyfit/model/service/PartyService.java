package com.ssafy.partyfit.model.service;

import java.util.List;

import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.SearchCondition;

public interface PartyService {
	public List<Party> showParty(SearchCondition condition);
	public int makeParty(Party party);
}
