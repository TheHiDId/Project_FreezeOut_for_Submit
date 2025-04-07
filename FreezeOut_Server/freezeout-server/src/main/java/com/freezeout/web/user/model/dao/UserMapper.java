package com.freezeout.web.user.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.freezeout.web.user.model.dto.UserDTO;
import com.freezeout.web.user.model.vo.UserVO;

@Mapper
public interface UserMapper {
	
	UserDTO getUserByUsername(String username);
	
	UserDTO getUserByNickname(String nickname);
	
	UserDTO getUserByEmail(String email);
	
	int signUp(UserVO user);
}
