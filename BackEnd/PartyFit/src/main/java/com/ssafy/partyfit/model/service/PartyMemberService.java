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
	PartyMember selectStatus(PartyMember partyMember);
	public List<Party> showMyParty(int userId);
	public int managePartyMember(PartyMember partyMember, boolean isAccept);
	public int joinRequest(PartyMember partyMember);
	int leaveRequest(PartyMember partyMember);
}
