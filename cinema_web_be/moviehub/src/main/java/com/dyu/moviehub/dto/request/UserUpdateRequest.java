package com.dyu.moviehub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

    @NotBlank(message = "FULLNAME_REQUIRED")
    @Size(min = 2, max = 100, message = "FULLNAME_INVALID")
    private String fullName;

    @Pattern(regexp = "^\\d{10}$", message = "INVALID_PHONE_NUMBER")
    private String phone;

    private String avatarPublicId;

    private String avatarUrl;
}
