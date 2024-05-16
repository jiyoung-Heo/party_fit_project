package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.ArticleUser;
import com.ssafy.partyfit.model.dto.User;

public interface ArticleService {
	List<Article> showArticle(Map<String, Object> map);
	int makeArticle(Article article);
	int removeArticle(int articleId);
	int modifyArticle(Article article);
	ArticleUser showAtricleDetail(int articleId);
	List<Article> showMyArticle(User user);
}
