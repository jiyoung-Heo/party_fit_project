package com.ssafy.partyfit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.ssafy.partyfit.model.dto.ArticleUser;
import com.ssafy.partyfit.model.dto.Comment;
import com.ssafy.partyfit.model.dto.Meet;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberCount;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.dto.User;
import com.ssafy.partyfit.model.service.ArticleService;
import com.ssafy.partyfit.model.service.CommentService;
import com.ssafy.partyfit.model.service.LikesService;
import com.ssafy.partyfit.model.service.MeetService;
import com.ssafy.partyfit.model.service.PartyMemberService;
import com.ssafy.partyfit.model.service.PartyService;
import com.ssafy.partyfit.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/party")
public class PartyController {
	Logger logger = LoggerFactory.getLogger(getClass());

	private PartyService partyService;
	private ArticleService articleService;
	private PartyMemberService partyMemberService;
	private MeetService meetService;
	private CommentService commentService;
	private LikesService likesService;
	private JwtUtil jwtUtil;

	public PartyController(PartyService partyService, ArticleService articleService,
			PartyMemberService partyMemberService, MeetService meetService, CommentService commentService,
			LikesService likesService, JwtUtil jwtUtil) {
		super();

		this.partyService = partyService;
		this.articleService = articleService;
		this.partyMemberService = partyMemberService;
		this.meetService = meetService;
		this.commentService = commentService;
		this.likesService = likesService;
		this.jwtUtil = jwtUtil;
	}

	/**
	 * 파티목록
	 * 
	 * @param condition
	 * @return
	 */
	@GetMapping("")
	public ResponseEntity<?> showParty(@ModelAttribute SearchCondition condition) {
		List<PartyMemberCount> partyList = partyService.showParty(condition);
		if (partyList == null || partyList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PartyMemberCount>>(partyList, HttpStatus.OK);
		}
	}

	/**
	 * 파티목록
	 * 
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}")
	public ResponseEntity<?> oneParty(@PathVariable("partyId") int partyId) {
		PartyMemberCount partyList = partyService.selectOneParty(partyId);
		if (partyList == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<PartyMemberCount>(partyList, HttpStatus.OK);
		}
	}

	/**
	 * 파티 만들기
	 * 
	 * @param party
	 * @return
	 */
	@PostMapping("")
	public ResponseEntity<?> makeParty(@RequestBody Party party) {
		int result = partyService.makeParty(party);
		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

	/**
	 * 파티 내부 게시글 목록 조회
	 * 
	 * @param partyId
	 * @param category  (0:자유게시판, 1: 가입인사, 2:공지사항, 3: 모임후기)
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/article/{category}")
	public ResponseEntity<?> showArticle(@PathVariable("partyId") int partyId, @PathVariable("category") int category,
			@ModelAttribute SearchCondition condition) {
		Map<String, Object> map = new HashMap<>();
		map.put("category", category);
		map.put("partyId", partyId);
		map.put("condition", condition);
		System.out.println(condition);
		List<Article> articleList = articleService.showArticle(map);

		if (articleList == null || articleList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Article>>(articleList, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 게시글 등록하기
	 * 
	 * @param partyId
	 * @param category
	 * @param article
	 * @param session
	 * @return
	 */
	@PostMapping("/{partyId}/article/{categoty}")
	public ResponseEntity<?> makeArticle(@PathVariable("partyId") int partyId, @PathVariable("categoty") int category,
			@RequestBody Article article, HttpSession session) {
		int userId;
		try {
			userId = (int) session.getAttribute("loginUser");
		} catch (NullPointerException e) {
			userId = 1;
		}

		article.setUserId(userId);
		article.setCategory(category);
		article.setPartyId(partyId);

		int result = articleService.makeArticle(article);

		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

	/**
	 * 파티 내부 게시글 지우기
	 * 
	 * @param articleId
	 * @return
	 */
	@DeleteMapping("/{partyId}/article/{articleId}")
	public ResponseEntity<?> removeArticle(@PathVariable("articleId") int articleId) {
		int result = articleService.removeArticle(articleId);
		if (result == 0) {
			// 삭제할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 삭제했을 경우
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
	}

	/**
	 * 파티 내부 게시글 상세보기
	 * 
	 * @param partyId
	 * @param category
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/article/{articleId}/{isReload}")
	public ResponseEntity<?> showArticleDetail(@PathVariable("articleId") int articleId,
			@PathVariable("isReload") boolean isReload) {
		ArticleUser articleUser = articleService.showAtricleDetail(articleId, isReload);

		if (articleUser == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<ArticleUser>(articleUser, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 게시글 수정하기
	 * 
	 * @param partyId
	 * @param articleId
	 * @param article
	 * @param session
	 * @return
	 */
	@PutMapping("/{partyId}/article/{articleId}")
	
	public ResponseEntity<?> modifyArticle(@PathVariable("partyId") int partyId,
			@PathVariable("articleId") int articleId, @RequestBody Article article, HttpSession session) {
		int userId;
		try {
			userId = (int) session.getAttribute("loginUser");
		} catch (NullPointerException e) {
			userId = 1;
		}
		article.setPartyId(partyId);
		article.setArticleId(articleId);
		article.setUserId(userId);

		int result = articleService.modifyArticle(article);
		if (result == 0) {
			// 업데이트할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 성공적으로 업데이트한 경우
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 게시글 좋아요 누르기 눌러져 있는 상태라면 해제하기
	 * 
	 * @param commentId
	 * @param comment
	 * @return
	 */
	@PutMapping("/{partyId}/article/{articleId}/like")
	public ResponseEntity<?> clickArticleLikes(@PathVariable("articleId") int articleId, HttpSession session) {
		int userId;
		try {
			userId = (int) session.getAttribute("loginUser");
		} catch (NullPointerException e) {
			userId = 1;
		}

		Map<String, Object> map = new HashMap<>();
		map.put("tableName", "article_likes");
		map.put("userId", userId);
		map.put("targetId", articleId);

		int result = likesService.clickLikes(map);

		if (result == 0) {
			// 업데이트할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 성공적으로 업데이트한 경우
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 게시글의 댓글 데이터 가져오기
	 * 
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/article/{articleId}/comment")
	public ResponseEntity<?> showComment(@PathVariable("articleId") int articleId) {
		List<Comment> commentList = commentService.showComment(articleId);
		if (commentList == null || commentList.size() == 0) {
			// 댓글없음
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);
		}
	}

	/**
	 * 댓글 작성하기
	 * 
	 * @param articleId
	 * @param comment
	 * @param session
	 * @return
	 */
	@PostMapping("/{partyId}/article/{articleId}/comment")
	public ResponseEntity<?> addComment(@PathVariable("articleId") int articleId, @RequestBody Comment comment) {
		// 해당 article 조회해와서 마지막의 topId를 조회해온다.
//		comment.setArticleId(articleId);
//		int userId;
//		try {
//			userId = (int) session.getAttribute("loginUser");
//		} catch (NullPointerException e) {
//			userId = 1;
//		}
//		comment.setUserId(userId);
		comment.setArticleId(articleId);
//		System.out.println("커맨트" + comment);

		int result = 0;

		// 제일 상위 depth의 댓글인 경우
		if (comment.getParentId() == 0) {
			// 부모글이 되는 경우
			result = commentService.addComment(comment, true);
		} else {
			// 대댓글인경우
			// depth는 하나 늘어야하고
			// seq는 해당 parent, depth중에 가장 마지막것의 +1
			comment.setDepth(comment.getDepth() + 1);
			result = commentService.addComment(comment, false);
		}
		List<Comment> commentList = commentService.showComment(articleId);

		if (result == 0) {
			return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);
		} else {
			return new ResponseEntity<List<Comment>>(commentList, HttpStatus.CREATED);
		}
	}

	/**
	 * 댓글 수정하기
	 * 
	 * @param commentId
	 * @param comment
	 * @return
	 */
	@PutMapping("/{partyId}/article/{articleId}/comment/{commentId}")
	public ResponseEntity<?> modifyComment(@PathVariable("articleId") int articleId,
			@PathVariable("commentId") int commentId, @RequestBody Comment comment) {
		comment.setCommentId(commentId);
		commentService.modifyComment(comment);
		List<Comment> commentList = commentService.showComment(articleId);

		return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);

	}

	/**
	 * 댓글 삭제하기
	 * 
	 * @param commentId
	 * @return
	 */
	@DeleteMapping("/{partyId}/article/{articleId}/comment/{commentId}")
	public ResponseEntity<?> removeComment(@PathVariable("articleId") int articleId,
			@PathVariable("commentId") int commentId) {
		commentService.removeComment(commentId);
		List<Comment> commentList = commentService.showComment(articleId);

		return new ResponseEntity<List<Comment>>(commentList, HttpStatus.OK);

	}

	/**
	 * 코멘트 좋아요 등록, 해제 관련
	 * 
	 * @param articleId
	 * @param session
	 * @return
	 */
	@PutMapping("/{partyId}/article/{commentId}/comment/like")
	public ResponseEntity<?> clickCommentLikes(@PathVariable("commentId") int commentId, HttpSession session) {
		int userId;
		try {
			userId = (int) session.getAttribute("loginUser");
		} catch (NullPointerException e) {
			userId = 1;
		}

		Map<String, Object> map = new HashMap<>();
		map.put("tableName", "comment_likes");
		map.put("userId", userId);
		map.put("targetId", commentId);

		int result = likesService.clickLikes(map);

		if (result == 0) {
			// 업데이트할 데이터가 없다면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 데이터를 성공적으로 업데이트한 경우
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	/**
	 * 코멘트 좋아요 했는지 여부
	 * 
	 * @param articleId
	 * @param session
	 * @return
	 */
	@GetMapping("/{partyId}/article/{commentId}/comment/like")
	public ResponseEntity<?> isCommentLikes(@PathVariable("commentId") int commentId, HttpServletRequest request) {
		String userId;
		String token = request.getHeader("Authorization");
		userId = jwtUtil.getUserId(token);
		System.out.println(userId);

		Map<String, Object> map = new HashMap<>();
		map.put("tableName", "comment_likes");
		map.put("userId", userId);
		map.put("targetId", commentId);

		int result = likesService.isLike(map);

		if (result == 0) {
			// 좋아요 안눌려있으면
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			// 좋아요 눌렸으면
			return new ResponseEntity<>(HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 멤버 조회하기
	 * 
	 * @param partyId
	 * @param status
	 * @return
	 */
	@GetMapping("/{partyId}/member/{status}")
	public ResponseEntity<?> showMember(@PathVariable("partyId") int partyId, @PathVariable("status") int status) {
		Map<String, Object> map = new HashMap<>();
		map.put("partyId", partyId);
		map.put("status", status);
		System.out.println("파티 멤버 조회" + status + " " + partyId);
		List<PartyMemberUser> partyMemberList = partyMemberService.showPartyMember(map);
		if (partyMemberList == null || partyMemberList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PartyMemberUser>>(partyMemberList, HttpStatus.OK);
		}
	}

	/**
	 * 유저의 전체 모임 정보 리턴
	 * 
	 * @param partyId
	 * @param status
	 * @return
	 */
	@GetMapping("/meet")
	public ResponseEntity<?> showAllMeet(@ModelAttribute("userId") int userId) {
		List<Meet> meetList = meetService.selectAllMeetForUser(userId);

		if (meetList == null || meetList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Meet>>(meetList, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 모임 조회하기
	 * 
	 * @param partyId
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/meet/{status}")
	public ResponseEntity<?> showMeet(@PathVariable("partyId") int partyId, @PathVariable("status") int status) {
		System.out.println("내부 모임 조회" + status + " " + partyId);
		Map<String, Object> map = new HashMap<>();
		map.put("partyId", partyId);
		map.put("status", status);
		map.put("condition", new SearchCondition());

		List<Meet> meetList = meetService.showMeet(map);

		if (meetList == null || meetList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			for (int i = 0; i < meetList.size(); i++) {
				int headcount = meetService.meetMemberCount(meetList.get(i).getMeetId());
				meetList.get(i).setHeadcount(headcount);
				if (headcount >= meetList.get(i).getMaxHeadcount()) {
					meetList.get(i).setStatus(2);
				}
				System.out.println(meetList.get(i));
			}

			return new ResponseEntity<List<Meet>>(meetList, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 모임 조회하기
	 * 
	 * @param partyId
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/meet")
	public ResponseEntity<?> showOneMeet(@PathVariable("partyId") int partyId, @ModelAttribute("meetId") int meetId) {

		Meet meet = meetService.selectMeetData(meetId);
		System.out.println("test: " + meet);
		if (meet == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {

			return new ResponseEntity<Meet>(meet, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 멤버 조회하기
	 * 
	 * @param partyId
	 * @param condition
	 * @return
	 */
	@GetMapping("/{partyId}/meet/{meetId}/member")
	public ResponseEntity<?> showMeetMember(@PathVariable("meetId") int meetId) {

		List<User> memberList = meetService.showMeetMember(meetId);

		if (memberList == null || memberList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {

			return new ResponseEntity<List<User>>(memberList, HttpStatus.OK);
		}
	}

	/**
	 * 파티 내부 모임 생성요청
	 * 
	 * @param partyId
	 * @param meet
	 * @return
	 */
	@PostMapping("/{partyId}/meet")
	public ResponseEntity<?> makeMeetRequest(@PathVariable("partyId") int partyId, @RequestBody Meet meet) {
		meet.setPartyId(partyId);
		int result = meetService.makeMeet(meet);
		int meetId = meetService.lastMeetId();

		Map<String, Object> map = new HashMap<>();

		map.put("meetId", meetId);
		map.put("userId", meet.getUserId());
		System.out.println(meet.getMeetId());
		System.out.println(meet.getUserId());
		meetService.joinRequest(map);
		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

	/**
	 * 파티 내부 모임 가입
	 * 
	 * @param meetId
	 * @param meet
	 * @return
	 */
	@PutMapping("/{partyId}/meet/{meetId}/{userId}")
	public ResponseEntity<?> joinMeetRequest(@PathVariable("userId") int userId, @PathVariable("meetId") int meetId) {
		Map<String, Object> map = new HashMap<>();
		map.put("meetId", meetId);
		map.put("userId", userId);
		System.out.println("가입 신청 함 ");

		int result = meetService.joinRequest(map);
		if (result == 0) {
			System.out.println("가입 신청 완료");
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

	/**
	 * 파티 내부 모임 가입취소
	 * 
	 * @param meetId
	 * @param meet
	 * @return
	 */
	@DeleteMapping("/{partyId}/meet/{meetId}/{userId}")
	public ResponseEntity<?> deleteMeetRequest(@PathVariable("userId") int userId, @PathVariable("meetId") int meetId) {
		Map<String, Object> map = new HashMap<>();
		map.put("meetId", meetId);
		map.put("userId", userId);
		System.out.println("가입 신청 함 ");

		int result = meetService.deleteRequest(map);
		if (result == 0) {
			System.out.println("가입 신청 완료");
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

}