package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.ArticleDao;
import com.ssafy.partyfit.model.dto.Article;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {
	private ArticleDao articleDao;

	public ArticleServiceImpl(ArticleDao articleDao) {
		this.articleDao = articleDao;
	}

	@Override
	public List<Article> showArticle(Map<String, Object> map) {
		return articleDao.selectArticle(map);
	}

	@Override
	public int makeArticle(Article article) {
		return articleDao.insertArticle(article);
	}


}
