package com.freezeout.web.token.model.service;

import java.util.Map;

public interface TokenService {
	
	String generateAccessToken(String username);
	
	String generateRefreshToken(String username);
	
	Map<String, String> validateRefreshToken(String refreshTokenValue);
}
