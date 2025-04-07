package com.freezeout.web.user.model.vo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import lombok.Value;

@Value
@Getter
@Builder
@ToString
public class UserVO {

	@NotBlank(message = "아이디는 비어있을 수 없습니다.")
	@Pattern(regexp = "^[a-z][a-z0-9]{6,14}[0-9]$", message = "아이디는 8 ~ 16자, 영어 소문자로 시작해서 숫자로 끝나야 합니다.")
	private String username;
	
	@NotBlank(message = "비밀번호는 비어있을 수 없습니다.")
	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,30}$", message = "비밀번호는 8 ~ 30자, 영어 알파벳과 숫자, 특수문자가 포함되어야 합니다.")
	private String password;
	
	@NotBlank(message = "닉네임은 비어있을 수 없습니다.")
	@Pattern(regexp = "^[\\uAC00-\\uD7A3a-zA-Z0-9]{2,10}$", message = "닉네임은 2 ~ 10자, 한글과 영어 알파벳, 숫자로 이루어져야 합니다.")
	private String nickname;
	
	@NotBlank(message = "이름은 비어있을 수 없습니다.")
	@Pattern(regexp = "^([a-zA-Z]{2,30}|[\\uAC00-\\uD7A3]{2,5})$", message = "잘못된 이름 형식 입니다.")
	private String realname;
	
	@NotBlank(message = "이메일은 비어있을 수 없습니다.")
	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "이메일 형식을 확인해 주세요. (예: example@email.com)")
	private String email;
	
	private String role;
	
}
