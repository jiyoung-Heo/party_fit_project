package com.ssafy.partyfit.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Party;
import com.ssafy.partyfit.model.dto.SearchCondition;
import com.ssafy.partyfit.model.service.ArticleServiceImpl;
import com.ssafy.partyfit.model.service.PartyServiceImpl;

@RestController
@RequestMapping("/party")
public class PartyController {
	private PartyServiceImpl partyService;
	private ArticleServiceImpl articleService;

	public PartyController(PartyServiceImpl partyService, ArticleServiceImpl articleService) {
		super();
		this.partyService = partyService;
		this.articleService = articleService;
	}

	@GetMapping("/")
	public ResponseEntity<?> showParty(@ModelAttribute SearchCondition condition){
		List<Party> partyList = partyService.showParty(condition);
		if(partyList == null || partyList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}else {
			return new ResponseEntity<List<Party>>(partyList, HttpStatus.OK);
		}
	}
	
	@PostMapping("/add")
	public ResponseEntity<?> makeParty(@RequestBody Party party){
		int result = partyService.makeParty(party);
		if(result == 0) {
			return new ResponseEntity<>(HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.CREATED);
		}
	}
	
	@GetMapping("/{partyId}/article/{categoty}")
	public ResponseEntity<?> showArticle(@PathVariable("partyId") int partyId, @PathVariable("categoty") int category, @ModelAttribute SearchCondition condition){
		Map<String, Object> map = new HashMap<>();
		map.put("category", category);
		map.put("partyId", partyId);
		map.put("condition", condition);
		
		List<Article> articleList = articleService.showArticle(map);
		
		if(articleList == null || articleList.size() == 0) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}else {
			return new ResponseEntity<List<Article>>(articleList, HttpStatus.OK);
		}
	}
}