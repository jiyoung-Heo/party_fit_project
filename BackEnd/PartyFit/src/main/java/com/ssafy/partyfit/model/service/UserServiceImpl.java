package com.ssafy.partyfit.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.partyfit.model.dao.UserDao;
import com.ssafy.partyfit.model.dto.User;

@Service
public class UserServiceImpl implements UserService{
	
	
	private UserDao userDao;

	@Autowired
	public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}

	@Override
	public void signUp(User user) {
		userDao.insertUser(user);
	}

	@Override
	public User login(User user) {
		
		return userDao.selectByInfo(user);
	}

	@Override
	public int modifyUser(User user) {
		return userDao.updateUserInfo(user);
	}

	@Override
	public User getUserById(int id) {
		return userDao.searchById(id);
	}

	@Override
	public User getUserByEmail(String email) {
		return userDao.searchByEmail(email);
	}

	@Override
	public boolean selectId(String loginId) {
		if(userDao.selectId(loginId)!=0)
			return false;
		return true;
	}

	@Override
	public boolean selectUsername(String username) {
		if(userDao.selectUsername(username)!=0)
			return false;
		return true;
	}

	@Override
	public boolean selectEmail(String email) {
		if(userDao.selectEmail(email)!=0)
			return false;
		return true;
	}

	@Override
	public int deleteUser(int userId) {
		return userDao.deleteUser(userId);
	}

	@Override
	public int modifyProfile(User user) {
		return userDao.updateUserProfile(user);
	}

}
