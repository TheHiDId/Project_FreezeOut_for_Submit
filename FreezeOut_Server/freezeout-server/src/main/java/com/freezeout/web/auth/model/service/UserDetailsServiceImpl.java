package com.freezeout.web.auth.model.service;

import java.util.Collections;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freezeout.web.auth.model.vo.CustomUserDetails;
import com.freezeout.web.user.model.dao.UserMapper;
import com.freezeout.web.user.model.dto.UserDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserMapper UserMapper;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserDTO user = UserMapper.getUserByUsername(username);
		
		if(user == null) {
			throw new UsernameNotFoundException("존재하지 않는 사용자 입니다.");
		}
		
		return CustomUserDetails.builder().username(user.getUsername())
										  .password(user.getPassword())
										  .nickname(user.getNickname())
										  .realname(user.getRealname())
										  .email(user.getEmail())
										  .authorities(Collections.singletonList(new SimpleGrantedAuthority(user.getRole())))
										  .build();
	}
}
