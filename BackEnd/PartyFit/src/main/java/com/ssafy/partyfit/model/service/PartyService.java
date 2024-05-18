package com.ssafy.partyfit.model.service;

import java.util.List;

import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberCount;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.User;

public interface PartyService {
	public List<Party> showParty(SearchCondition condition);
	public List<PartyMemberCount> showPartyAndMemberCountOrderByMemberCount();
	public int makeParty(Party party);

}
