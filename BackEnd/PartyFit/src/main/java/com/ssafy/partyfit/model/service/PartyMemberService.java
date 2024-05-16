package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMember;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.dto.User;

public interface PartyMemberService {
	List<PartyMemberUser> showPartyMember(Map<String, Object> map);
	public List<Party> showMyParty(User user);
	public int managePartyMember(PartyMember partyMember, boolean isAccept);
}
