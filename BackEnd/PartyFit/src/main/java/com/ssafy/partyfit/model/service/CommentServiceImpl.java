package com.ssafy.partyfit.model.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ssafy.partyfit.model.dao.CommentDao;
import com.ssafy.partyfit.model.dto.Comment;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
	private CommentDao commentDao;

	public CommentServiceImpl(CommentDao commentDao) {
		this.commentDao = commentDao;
	}

	@Override
	public List<Comment> showComment(int articleId) {
		return commentDao.selectComment(articleId);
	}
	
}
