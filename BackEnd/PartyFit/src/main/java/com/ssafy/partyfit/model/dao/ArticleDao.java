package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;

public interface ArticleDao {
	List<Article> selectArticle(Map<String, Object> map);
	int insertArticle(Article article);
	int deleteArticle(int articleId);
}
