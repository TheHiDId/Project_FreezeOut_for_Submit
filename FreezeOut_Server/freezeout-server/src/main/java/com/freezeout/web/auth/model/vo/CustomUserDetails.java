package com.freezeout.web.auth.model.vo;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.Value;

@Value
@Getter
@Builder
@ToString
public class CustomUserDetails implements UserDetails {
	
	private String username;
	private String password;
	private String nickname;
	private String realname;
	private String email;
	private Collection<? extends GrantedAuthority> authorities;

}
