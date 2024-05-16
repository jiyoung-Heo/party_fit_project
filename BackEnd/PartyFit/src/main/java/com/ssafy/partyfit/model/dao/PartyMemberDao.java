package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.dto.User;

public interface PartyMemberDao {
	List<PartyMemberUser> selectPartyMember(Map<String, Object> map);
	List<Party> selectMyParty(User user);
	
}
