package com.ssafy.partyfit.model.dto;

import lombok.Data;

@Data
public class User {
	private int userId;
	private String name;
	private String loginId;
	private String password;
	private String username;
	private String email;
	private String profile;
	private char deleteYn;
	private int age;
	
    public User() {
    }
    
	
	public User(String name, String loginId, String password, String username, String email, int age) {
		super();
		this.name = name;
		this.loginId = loginId;
		this.password = password;
		this.username = username;
		this.email = email;
		this.age = age;
	}
	
	


	


}
