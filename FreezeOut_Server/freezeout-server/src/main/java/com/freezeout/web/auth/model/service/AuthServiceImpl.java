package com.freezeout.web.auth.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.freezeout.web.auth.model.dto.LoginDTO;
import com.freezeout.web.auth.model.vo.CustomUserDetails;
import com.freezeout.web.token.model.service.TokenService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final AuthenticationManager authenticationManager;
	private final TokenService tokenService;
	
	@Override
	public Map<String, String> login(LoginDTO user) {
		
		Authentication authentication = null;
		
		try {
			authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

		} catch (AuthenticationException e) {
			throw new RuntimeException("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
		}
		
		CustomUserDetails userDetails = (CustomUserDetails)authentication.getPrincipal();
		
		Map<String, String> loginResponse = new HashMap<String, String>();
		
		loginResponse.put("username", userDetails.getUsername());
		loginResponse.put("nickname", userDetails.getNickname());
		loginResponse.put("realname", userDetails.getRealname());
		loginResponse.put("email", userDetails.getEmail());
		loginResponse.put("accessToken", tokenService.generateAccessToken(userDetails.getUsername()));
		
		if(user.isKeep()) {
			loginResponse.put("refreshToken", tokenService.generateRefreshToken(userDetails.getUsername()));
		}
		
		return loginResponse;
	}
	
	@Override
	public CustomUserDetails getUserDetails() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		CustomUserDetails user = (CustomUserDetails)authentication.getPrincipal();
		
		return user;
	}

}
