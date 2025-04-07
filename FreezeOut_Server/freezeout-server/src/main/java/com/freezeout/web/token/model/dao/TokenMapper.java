package com.freezeout.web.token.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.freezeout.web.token.model.vo.RefreshTokenVO;

@Mapper
public interface TokenMapper {

	RefreshTokenVO selectToken(RefreshTokenVO token);
	
	void insertToken(RefreshTokenVO token);
	
	void deleteToken(String username, Long currentTime);
}
