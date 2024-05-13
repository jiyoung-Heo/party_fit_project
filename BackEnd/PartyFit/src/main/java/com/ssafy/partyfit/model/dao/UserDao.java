package com.ssafy.partyfit.model.dao;

import com.ssafy.partyfit.model.dto.User;


public interface UserDao {
	// user 등록
	public boolean insertUser(User user);
	
	// user login_id로 검색
	public User selectByInfo(User user);
	
	
	
}
