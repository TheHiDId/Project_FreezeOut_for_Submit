package com.freezeout.web.user.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freezeout.web.user.model.dto.UserDTO;
import com.freezeout.web.user.model.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;
	
	@PostMapping
	public ResponseEntity<?> signUp(@RequestBody @Valid UserDTO user) {
		
		userService.signUp(user);
		
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
