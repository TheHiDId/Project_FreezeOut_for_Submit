package com.freezeout.web.auth.model.service;

import java.util.Map;

import com.freezeout.web.auth.model.dto.LoginDTO;
import com.freezeout.web.auth.model.vo.CustomUserDetails;

public interface AuthService {

	Map<String, String> login(LoginDTO user);
	
	CustomUserDetails getUserDetails();
	
}
