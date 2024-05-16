package com.ssafy.partyfit.model.service;

import java.util.List;

import com.ssafy.partyfit.model.dto.Comment;
import com.ssafy.partyfit.model.dto.User;

public interface CommentService {
	List<Comment> showComment(int articleId);

	int addComment(Comment article, boolean isParent);
	
	int removeComment(int commentId);

	int modifyComment(Comment comment);

	List<Comment> showMyComment(User user);

}
