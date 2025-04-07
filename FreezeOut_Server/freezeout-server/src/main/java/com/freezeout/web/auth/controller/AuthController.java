package com.freezeout.web.auth.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freezeout.web.auth.model.dto.LoginDTO;
import com.freezeout.web.auth.model.service.AuthService;
import com.freezeout.web.token.model.service.TokenService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
public class AuthController {

	private final AuthService authService;
	private final TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid LoginDTO user) {

		Map<String, String> loginResponse = authService.login(user);
		
		return ResponseEntity.ok(loginResponse);
	}
	
	@PostMapping("/refresh")
	public ResponseEntity<?> validateRefreshToken(@RequestBody Map<String, String> token) {
		
		String refreshToken = token.get("refreshToken");
		
		Map<String, String> newTokens = tokenService.validateRefreshToken(refreshToken);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(newTokens);
	}
}
