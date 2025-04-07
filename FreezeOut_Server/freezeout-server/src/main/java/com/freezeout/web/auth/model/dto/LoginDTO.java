package com.freezeout.web.auth.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LoginDTO {
	
	@NotBlank(message = "아이디는 비어있을 수 없습니다.")
	@Pattern(regexp = "^[a-z][a-z0-9]{6,14}[0-9]$", message = "아이디는 8 ~ 16자, 영어 소문자로 시작해서 숫자로 끝나야 합니다.")
	private String username;
	
	@NotBlank(message = "비밀번호는 비어있을 수 없습니다.")
	@Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?]).{8,30}$", message = "비밀번호는 8 ~ 30자, 영어 알파벳과 숫자, 특수문자가 포함되어야 합니다.")
	private String password;
	
	private boolean keep;
}
