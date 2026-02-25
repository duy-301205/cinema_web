package com.dyu.moviehub.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterRequest {

    @NotBlank(message = "Name mustn't blank")
    private String fullName;

    @NotBlank(message = "Email mustn't blank")
    @Email(message = "Email do not validate")
    private String email;

    @NotBlank(message = "Password mustn't blank")
    @Size(min = 6, message = "Password must have more than 6 character")
    private String password;

    @NotBlank(message = "Phone mustn't blank")
    @Pattern(regexp = "^\\d{10}$", message = "Phone number must be exactly 10 digits")
    private String phone;
}
