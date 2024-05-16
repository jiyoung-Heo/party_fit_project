package com.ssafy.partyfit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Comment;
import com.ssafy.partyfit.model.dto.Meet;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.User;
import com.ssafy.partyfit.model.service.ArticleService;
import com.ssafy.partyfit.model.service.CommentService;
import com.ssafy.partyfit.model.service.MeetService;
import com.ssafy.partyfit.model.service.PartyMemberService;
import com.ssafy.partyfit.model.service.PartyService;
import com.ssafy.partyfit.model.service.UserService;
import com.ssafy.partyfit.util.JwtUtil;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private UserService userService;	
	private PartyService partyService;
	private ArticleService articleService;
	private PartyMemberService partyMemberService;
	private MeetService meetService;
	private CommentService commentService;
	private JwtUtil jwtUtil;
	
	public UserController(UserService userService, PartyService partyService, ArticleService articleService,
			PartyMemberService partyMemberService, MeetService meetService, CommentService commentService,
			JwtUtil jwtUtil) {
		super();
		this.userService = userService;
		this.partyService = partyService;
		this.articleService = articleService;
		this.partyMemberService = partyMemberService;
		this.meetService = meetService;
		this.commentService = commentService;
		this.jwtUtil = jwtUtil;
	}

	
	// 회원가입 하는 기능
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody User user, HttpSession session) {
		System.out.println("signup");
		System.out.println("signup" + user);
		userService.signUp(user);
		System.out.println("회원가입할때" + session.getAttribute("loginUser"));

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	// 로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {

		HttpStatus status = null;
		Map<String, Object> result = new HashMap<>();

		System.out.println(user);

		User tmp = userService.login(user);

		if (tmp.getLoginId() != null) {
			result.put("message", "success");
			result.put("access-token", jwtUtil.createToken(tmp.getUserId()));
			System.out.println("성공" + tmp);
			session.setAttribute("loginUser", tmp.getUserId());
			System.out.println("로그인 후 " + session.getAttribute("loginUser"));
			status = HttpStatus.ACCEPTED;
		} else {
			result.put("message", "fail");
			status = HttpStatus.NO_CONTENT;
		}

		return new ResponseEntity<>(result, status);

	}

	// 로그아웃
	@PostMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		System.out.println("로그아웃 전 " + session.getAttribute("loginUser"));
		session.removeAttribute("loginUser");
		System.out.println(session.getAttribute("loginUser"));
		return new ResponseEntity<String>("로그아웃완료", HttpStatus.OK);
	}

	// 회원정보 수정
	@PutMapping("/{userId}")
	public ResponseEntity<?> updateUserInfo(@RequestBody User user, HttpSession session) {
		int result = userService.modifyUser(user);
		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 이메일로 user 찾기
	@GetMapping("/find-id")
	public ResponseEntity<?> findId(@ModelAttribute User user) {
		System.out.println("아이디 찾기" + user.getEmail() + "name : " + user.getName());
		User tmp = userService.getUserByEmail(user.getEmail());
		System.out.println(tmp);
		if (tmp != null && tmp.getName().equals(user.getName())) {
			return new ResponseEntity<User>(tmp, HttpStatus.OK);
		}

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	// 이메일,아이디로 user 찾기
	@GetMapping("/find-pw/{email}/{loginId}")
	public ResponseEntity<?> findPW(@PathVariable("email") String email, @PathVariable("loginId") String loginId,
			@RequestBody String name) {

		User tmp = userService.getUserByEmail(email);
		if (tmp != null && tmp.getLoginId().equals(loginId) && tmp.getName().equals(name)) {
			return new ResponseEntity<User>(tmp, HttpStatus.OK);

		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}

	// UserId만 담겨있는 객체를 주면 User객체 리턴
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUser(@ModelAttribute User user) {
		User tmp = userService.getUserById(user.getUserId());
		System.out.println("getUser  " + tmp);
		if (tmp != null) {
			return new ResponseEntity<User>(tmp, HttpStatus.OK);
		}

		return new ResponseEntity<>(HttpStatus.NOT_FOUND);

	}
	
	
	//아이디 중복 체크 
	@PostMapping("/confirmId")
	public ResponseEntity<?> confirmId(@RequestBody User user ){
//		System.out.println(user);
//		System.out.println("아이디 중복 체크" + userService.selectId(user.getLoginId()) +" : " +user.getLoginId());
		if(userService.selectId(user.getLoginId())) { //중복되는 아이디 없음
			System.out.println("성공함");
			return new ResponseEntity<String>("1",HttpStatus.OK);
		}
		return new ResponseEntity<String>("0",HttpStatus.OK);
	}
	
	//비밀번호 일치 여부 
	@GetMapping("/find-pw/{email}/{loginId}")
	public ResponseEntity<?> findPW(@PathVariable("email") String email,@PathVariable("loginId") String loginId,@RequestBody String name){
	
		User tmp = userService.getUserByEmail(email);
		if(tmp != null && tmp.getLoginId().equals(loginId) && tmp.getName().equals(name)) {
			return new ResponseEntity<User>(tmp,HttpStatus.OK);
			
		}
		return new ResponseEntity<String>("0",HttpStatus.OK);
	}
	
	// UserId만 담겨있는 객체를 주면 User객체 리턴
	@GetMapping("/{userId}")
	public ResponseEntity<?> getUser(@ModelAttribute User user) {
		User tmp = userService.getUserById(user.getUserId());
		System.out.println("getUser  " + tmp);
		if (tmp != null) {
			return new ResponseEntity<User>(tmp, HttpStatus.OK);
		}
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	
	//아이디 중복 체크 
	@PostMapping("/confirmId")
	public ResponseEntity<?> confirmId(@RequestBody User user ){
//		System.out.println(user);
//		System.out.println("아이디 중복 체크" + userService.selectId(user.getLoginId()) +" : " +user.getLoginId());
		if(userService.selectId(user.getLoginId())) { //중복되는 아이디 없음
			System.out.println("성공함");
			return new ResponseEntity<String>("1",HttpStatus.OK);
		}
		return new ResponseEntity<String>("0",HttpStatus.OK);
	}
	
	//닉네임 중복 체크 
	@PostMapping("/confirmUserName")
	public ResponseEntity<?> confirmUserName(@RequestBody User user ){
		System.out.println(user);
//		System.out.println("아이디 중복 체크" + userService.selectId(user.getLoginId()) +" : " +user.getLoginId());
		if(userService.selectUsername(user.getUsername())) { //중복되는 아이디 없음
			System.out.println("성공함");
			return new ResponseEntity<String>("1",HttpStatus.OK);
		}
		return new ResponseEntity<String>("0",HttpStatus.OK);
	}
	
	//이메일 중복 체크 
	@PostMapping("/confirmEmail")
	public ResponseEntity<?> confirmEmail(@RequestBody User user ){
		System.out.println(user.getEmail());
//		System.out.println("아이디 중복 체크" + userService.selectId(user.getLoginId()) +" : " +user.getLoginId());
		if(userService.selectEmail(user.getEmail())) { //중복되는 아이디 없음
			System.out.println("성공함");
			return new ResponseEntity<String>("1",HttpStatus.OK);
		}
		return new ResponseEntity<String>("0",HttpStatus.OK);
	}
	
	
	
	
	//나의 파티핏 조회
	@GetMapping("/myPartyfit/{userId}")
	public ResponseEntity<?> showMyParty(@ModelAttribute User user){
		List<Party> partyList = partyMemberService.showMyParty(user);
		 System.out.println(partyList);
		if (partyList == null || partyList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Party>>(partyList, HttpStatus.OK);
		}
		
	}
	
	
	//내가 쓴 글 조회 
	@GetMapping("/myArticle")
	public ResponseEntity<?> showMyArticle(@ModelAttribute User user){
	List<Article> articleList = articleService.showMyArticle(user);
		if (articleList == null || articleList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Article>>(articleList, HttpStatus.OK);
		}
	}
	
	//내가 쓴 댓글 조회 
	@GetMapping("/myComment")
	public ResponseEntity<?> showMyComment(@ModelAttribute User user){
	List<Comment> commentList = commentService.showMyComment(user);
		if (commentList == null || commentList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);
		}
	}
	
	
	//내가 참여한 모임 
	@GetMapping("/myMeet")
	public ResponseEntity<?> showMyMeet(@ModelAttribute User user){
	List<Meet> meetList = meetService.showMyMeet(user);
		if (meetList == null || meetList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Meet>>(meetList, HttpStatus.OK);
		}
	}
	
	//회원 탈퇴
	@DeleteMapping("/{userId}")
	public ResponseEntity<?> removeUser(@PathVariable("userId") int userId){
		int result = userService.deleteUser(userId);
		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}
	}
