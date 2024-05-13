package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.PartyMemberUser;

public interface PartyMemberService {
	List<PartyMemberUser> showPartyMember(Map<String, Object> map);
}
