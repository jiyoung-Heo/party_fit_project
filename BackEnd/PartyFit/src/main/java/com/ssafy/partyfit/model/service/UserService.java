package com.ssafy.partyfit.model.service;

import com.ssafy.partyfit.model.dto.User;

public interface UserService {

	//회원가입 
	public void signUp(User user);
	
	//로그인하기 
	public User login(User user);
	
	//회원정보수정하기 
	public int modifyUser(User user);

	public User getUserById(int id);
	
	//아이디찾기
	public User getUserByEmail(String email);
	
	public boolean selectId(String loginId);

	public boolean selectUsername(String username);

	public boolean selectEmail(String email);

	public int deleteUser(int userId);

}
