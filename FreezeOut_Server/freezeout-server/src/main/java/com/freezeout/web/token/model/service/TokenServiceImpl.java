package com.freezeout.web.token.model.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.freezeout.web.token.model.dao.TokenMapper;
import com.freezeout.web.token.model.vo.RefreshTokenVO;
import com.freezeout.web.token.util.JwtUtil;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService {
	
	private final JwtUtil tokenUtil;
	private final TokenMapper tokenMapper;

	@Override
	public String generateAccessToken(String username) {
		return tokenUtil.getAccessToken(username);
	}

	@Override
	public String generateRefreshToken(String username) {

		String refreshToken = tokenUtil.getRefreshToken(username);
		
		RefreshTokenVO tokenVO = RefreshTokenVO.builder()
											   .tokenValue(refreshToken)
											   .username(username)
											   .expiresAt(System.currentTimeMillis() + 36000000L * 24 * 28)
											   .build();
		
		tokenMapper.insertToken(tokenVO);
		
		tokenMapper.deleteToken(username, System.currentTimeMillis());
		
		return refreshToken;
	}

	@Override
	public Map<String, String> validateRefreshToken(String refreshTokenValue) {
		
		Claims tokenPayload = tokenUtil.parseJwt(refreshTokenValue);
		
		RefreshTokenVO token = RefreshTokenVO.builder().tokenValue(refreshTokenValue).build();
		
		RefreshTokenVO tokenVO = tokenMapper.selectToken(token);
		
		Long expiration = tokenPayload.getExpiration().getTime();
		
		if(tokenVO == null || expiration < System.currentTimeMillis()) {
			throw new RuntimeException("유효하지 않은 토큰 입니다.");
		}

		String username = tokenPayload.getSubject();
		
		Map<String, String> newTokens = new HashMap<String, String>();
		
		newTokens.put("accessToken", generateAccessToken(username));
		newTokens.put("refreshToken", generateRefreshToken(username));
		
		return newTokens;
	}
	
}
