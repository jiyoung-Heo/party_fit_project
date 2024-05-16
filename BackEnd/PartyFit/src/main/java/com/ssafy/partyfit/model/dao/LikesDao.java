package com.ssafy.partyfit.model.dao;

import java.util.Map;

public interface LikesDao {
	int insertLikes(Map<String, Object> map);
	int isLike(Map<String, Object> map);
	int deleteLikes(Map<String, Object> map);
}
