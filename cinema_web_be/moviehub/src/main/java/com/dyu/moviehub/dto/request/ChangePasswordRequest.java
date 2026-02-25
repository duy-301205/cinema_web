package com.dyu.moviehub.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {

    @NotBlank(message = "Old password not null")
    private String oldPassword;

    @NotBlank(message = "New password not null")
    @Size(min = 6, message = "New password has less 6 character")
    private String newPassword;

    @NotBlank(message = "Confirm password not null")
    private String confirmPassword;
}
