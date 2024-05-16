package com.ssafy.partyfit.model.service;

import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.LikesDao;

@Service
@Transactional
public class LikesServiceImpl implements LikesService {
	private LikesDao likesDao;
	
	public LikesServiceImpl(LikesDao likesDao) {
		super();
		this.likesDao = likesDao;
	}

	@Override
	public int clickLikes(Map<String, Object> map) {
//		likesDao.isLike(map)
		return likesDao.insertLikes(map);
	}

}
