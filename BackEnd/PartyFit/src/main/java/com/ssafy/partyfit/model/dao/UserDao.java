package com.ssafy.partyfit.model.dao;

import com.ssafy.partyfit.model.dto.User;


public interface UserDao {
	// user 등록
	public boolean insertUser(User user);
	
	// user login_id로 검색
	public User selectByInfo(User user);
	
	// user 정보수정
	public int updateUserInfo(User user);

	public User searchById(int id);
	
	public User searchByEmail(String email);
}
