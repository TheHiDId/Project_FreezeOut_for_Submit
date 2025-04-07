package com.freezeout.web.user.model.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freezeout.web.user.model.dao.UserMapper;
import com.freezeout.web.user.model.dto.UserDTO;
import com.freezeout.web.user.model.vo.UserVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserMapper userMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public void signUp(UserDTO user) {
		
		UserDTO searchedUserByUsername = userMapper.getUserByUsername(user.getUsername());
		
		if(searchedUserByUsername != null) {
			throw new RuntimeException("이미 사용 중인 아이디 입니다.");
		}
		
		UserDTO searchedUserByNickname = userMapper.getUserByNickname(user.getNickname());
		
		if(searchedUserByNickname != null) {
			throw new RuntimeException("이미 사용 중인 닉네임 입니다.");
		}
		
		UserDTO searchedUserByEmail = userMapper.getUserByEmail(user.getEmail());
		
		if(searchedUserByEmail != null) {
			throw new RuntimeException("이미 사용 중인 이메일 입니다.");
		}
		
		UserVO userVO = UserVO.builder()
							  .username(user.getUsername())
							  .password(passwordEncoder.encode(user.getPassword()))
							  .nickname(user.getNickname())
							  .realname(user.getRealname())
							  .email(user.getEmail())
							  .role("ROLE_USER")
							  .build();
		
		if(userMapper.signUp(userVO) != 1) {
			throw new RuntimeException("알 수 없는 이유로 회원가입에 실패 했습니다. 나중에 다시 시도해 주세요.");
		}
	}

}
