package com.freezeout.web.token.model.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.Value;

@Value
@Getter
@Builder
@ToString
public class RefreshTokenVO {

	private String username;
	private String tokenValue;
	private Long expiresAt;
	
}
