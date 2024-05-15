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

	@Override
	public int addComment(Comment comment, boolean isParent) {
		if (isParent) {
			int lastCommentId = commentDao.selectLastCommentId();
			comment.setParentId(lastCommentId + 1);
		} else {
			// 마지막댓글가져와서 seq 유추
			int lastSeq = commentDao.selectLastSeq(comment);
			comment.setSeq(lastSeq + 1);
		}
		return commentDao.insertComment(comment);
	}
}
