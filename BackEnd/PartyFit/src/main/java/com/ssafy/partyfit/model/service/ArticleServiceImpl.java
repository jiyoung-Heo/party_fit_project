package com.ssafy.partyfit.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.ArticleDao;
import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.ArticleUser;
import com.ssafy.partyfit.model.dto.User;

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

	@Override
	public int removeArticle(int articleId) {
		return articleDao.updateDeleteArticle(articleId);
	}

	@Override
	public int modifyArticle(Article article) {
		return articleDao.updateArticle(article);
	}

	@Override
	public ArticleUser showAtricleDetail(int articleId, boolean isReload) {
		if(!isReload) {
			articleDao.updateArticleViewCount(articleId);
		}
		return articleDao.selectAtricleDetail(articleId);
	}

	@Override
	public List<Article> showMyArticle(User user) {
		return articleDao.selectMyArticle(user);
	}

}
