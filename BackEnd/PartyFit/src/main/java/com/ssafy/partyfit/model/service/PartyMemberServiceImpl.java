package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.ArticleDao;
import com.ssafy.partyfit.model.dao.PartyMemberDao;
import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.PartyMemberUser;

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

}
