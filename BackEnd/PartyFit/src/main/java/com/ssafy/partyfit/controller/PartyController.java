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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.PartyMemberUser;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.service.ArticleService;
import com.ssafy.partyfit.model.service.ArticleServiceImpl;
import com.ssafy.partyfit.model.service.PartyMemberService;
import com.ssafy.partyfit.model.service.PartyService;
import com.ssafy.partyfit.model.service.PartyServiceImpl;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/party")
public class PartyController {
	private PartyService partyService;
	private ArticleService articleService;
	private PartyMemberService partyMemberService;

	public PartyController(PartyService partyService, ArticleService articleService,
			PartyMemberService partyMemberService) {
		super();
		this.partyService = partyService;
		this.articleService = articleService;
		this.partyMemberService = partyMemberService;
	}

	@GetMapping("/")
	public ResponseEntity<?> showParty(@ModelAttribute SearchCondition condition) {
		List<Party> partyList = partyService.showParty(condition);
		if (partyList == null || partyList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Party>>(partyList, HttpStatus.OK);
		}
	}

	@PostMapping("/")
	public ResponseEntity<?> makeParty(@RequestBody Party party) {
		int result = partyService.makeParty(party);
		if (result == 0) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}

	@GetMapping("/{partyId}/article/{categoty}")
	public ResponseEntity<?> showArticle(@PathVariable("partyId") int partyId, @PathVariable("categoty") int category,
			@ModelAttribute SearchCondition condition) {
		Map<String, Object> map = new HashMap<>();
		map.put("category", category);
		map.put("partyId", partyId);
		map.put("condition", condition);

		List<Article> articleList = articleService.showArticle(map);

		if (articleList == null || articleList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Article>>(articleList, HttpStatus.OK);
		}
	}

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

	// Delete /article/{articleId}로도 충분히 가능한 api이다. 회의 필요
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

	@GetMapping("/{partyId}/member/{grade}")
	public ResponseEntity<?> showMember(@PathVariable("partyId") int partyId, @PathVariable("grade") int grade) {
		Map<String, Object> map = new HashMap<>();
		map.put("partyId", partyId);
		map.put("grade", grade);
		
		List<PartyMemberUser> partyMemberList = partyMemberService.showPartyMember(map);
		if (partyMemberList == null || partyMemberList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<PartyMemberUser>>(partyMemberList, HttpStatus.OK);
		}
	}
}