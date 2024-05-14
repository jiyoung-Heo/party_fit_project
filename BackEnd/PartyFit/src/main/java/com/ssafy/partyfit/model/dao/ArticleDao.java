package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.ArticleUser;

public interface ArticleDao {
	List<Article> selectArticle(Map<String, Object> map);
	int insertArticle(Article article);
	int updateArticle(Article article);
	int deleteArticle(int articleId);
	ArticleUser selectAtricleDetail(int articleId);
	int updateArticleViewCount(int articleId);
}
