package com.ssafy.partyfit.model.service;

import java.util.List;

import com.ssafy.partyfit.model.dto.Comment;

public interface CommentService {
	List<Comment> showComment(int articleId);


}