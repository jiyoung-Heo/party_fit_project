package com.ssafy.partyfit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
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

		session.setAttribute("loginUser", tmp.getLoginId());
		
		return new ResponseEntity<String>("로그인성공", HttpStatus.OK);

	}
	
	//로그아웃
	public ResponseEntity<?> logout(HttpSession session) {
		session.removeAttribute("loginUser");
		return new ResponseEntity<String>("로그아웃완료", HttpStatus.OK);
	}
	
	
	
}
