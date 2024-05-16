package com.ssafy.partyfit.model.dao;

import java.util.List;
import java.util.Map;

import com.ssafy.partyfit.model.dto.Article;
import com.ssafy.partyfit.model.dto.Comment;

public interface CommentDao {
	List<Comment> selectComment(int articleId);

	Comment selectLastComment(Comment comment);

	int selectLastCommentId();

	int selectLastSeq(Comment comment);

	int insertComment(Comment comment);
	
	int updateDeleteComment(int commentId);
	
	int updateComment(Comment comment);
}
