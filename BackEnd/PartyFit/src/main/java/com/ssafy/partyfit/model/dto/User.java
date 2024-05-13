package com.ssafy.partyfit.model.dto;

public class User {
	int user_id;
	String name;
	String login_id;
	String password;
	String username;
	String email;
	String profile;
	char delete_yn;

	public User(String name, String login_id, String password, String username, String email) {
		super();
		this.name = name;
		this.login_id = login_id;
		this.password = password;
		this.username = username;
		this.email = email;
	}

	public int getUser_id() {
		return user_id;
	}

	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLogin_id() {
		return login_id;
	}

	public void setLogin_id(String login_id) {
		this.login_id = login_id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getProfile() {
		return profile;
	}

	public void setProfile(String profile) {
		this.profile = profile;
	}

	public char getDelete_yn() {
		return delete_yn;
	}

	public void setDelete_yn(char delete_yn) {
		this.delete_yn = delete_yn;
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", name=" + name + ", login_id=" + login_id + ", password=" + password
				+ ", username=" + username + ", email=" + email + ", profile=" + profile + ", delete_yn=" + delete_yn
				+ "]";
	}

}
