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
		int isLike = likesDao.isLike(map);
		int result;
		if (isLike == 1) {
			// 데이터가 있는경우 삭제해야함
			result = likesDao.deleteLikes(map);
		} else {
			// 데이터가 없으면 만들어야함
			result = likesDao.insertLikes(map);

		}
		return result;
	}

	@Override
	public int isLike(Map<String, Object> map) {
		int isLike = likesDao.isLike(map);
		if (isLike == 1) {
			// 데이터가 있는경우 좋아요 눌린것
		return 1;
		} 
		//데이터가 없는경우 좋아요가 안눌린것
		return 0;
	}
	
	

}
