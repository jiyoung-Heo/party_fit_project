package com.ssafy.partyfit.model.service;

import com.ssafy.partyfit.model.dao.UserDao;
import com.ssafy.partyfit.model.dto.User;

@Service
public class UserServiceImpl implements UserService{
	
	private UserDao userDao;

	public UserServiceImpl(UserDao userDao) {
	
		this.userDao = userDao;
	}

	@Override
	public void signUp(User user) {
			}

	@Override
	public User login(User user) {
		return null;
	}
	
	
	

}
