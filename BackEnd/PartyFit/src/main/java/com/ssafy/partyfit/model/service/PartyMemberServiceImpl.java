package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.PartyMemberDao;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMember;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.dto.User;

@Service
@Transactional
public class PartyMemberServiceImpl implements PartyMemberService {

	PartyMemberDao partyMemberDao;
	
	public PartyMemberServiceImpl(PartyMemberDao partyMemberDao) {
		super();
		this.partyMemberDao = partyMemberDao;
	}

	@Override
	public List<PartyMemberUser> showPartyMember(Map<String, Object> map) {
		return partyMemberDao.selectPartyMember(map);
	}
	
	@Override
	public List<Party> showMyParty(User user){
		return partyMemberDao.selectMyParty(user);
	}

	@Override
	public int managePartyMember(PartyMember partyMember, boolean isAccept) {
		int result;
		if(isAccept) {
			result = partyMemberDao.updatePartyMember(partyMember);
		}else {
			result = partyMemberDao.deletePartyMember(partyMember);
		}
		return result;
	}
	
	
	
}
