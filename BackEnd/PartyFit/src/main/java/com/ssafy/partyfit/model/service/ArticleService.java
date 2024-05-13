package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;

public interface ArticleService {
	List<Article> showArticle(Map<String, Object> map);

}
