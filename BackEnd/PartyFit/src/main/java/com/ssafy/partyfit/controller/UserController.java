package com.ssafy.partyfit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.partyfit.model.dto.User;
import com.ssafy.partyfit.model.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {
	
	@Autowired
	UserService userService;
	
	// 회원가입 하는 기능
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user) {
		System.out.println("signup");
		System.out.println("signup" + user);
		userService.signUp(user);
		
		return new ResponseEntity<>(HttpStatus.CREATED);
	}
	
	//로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {

		System.out.println("user" + user);
		User tmp = userService.login(user);
		if (tmp == null)
			return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
		user.getUserId();
		session.setAttribute("loginUser", tmp.getUserId());
//		session.getAttribute("loginUser")
		
		System.out.println(session.getAttribute("loginUser"));
		return new ResponseEntity<User>(tmp, HttpStatus.OK);

	}
	
	//로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.removeAttribute("loginUser");
		return new ResponseEntity<String>("로그아웃완료", HttpStatus.OK);
	}
	
	
	//회원정보 수정
	@PostMapping("/userUpdate")
	public ResponseEntity<?> updateUserInfo(@RequestBody User user, HttpSession session) {
//		userService.userUpdate(user);
//		System.out.println("userUpdate" + user);
//		session.getAttribute("loginUser")
		System.out.println(session.getAttribute("loginUser"));
		User tmp = userService.getUserById((int)session.getAttribute("loginUser"));
		
		
		return new  ResponseEntity<User>(tmp, HttpStatus.OK);

	}
	
}
