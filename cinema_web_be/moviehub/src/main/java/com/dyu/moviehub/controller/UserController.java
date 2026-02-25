package com.dyu.moviehub.controller;

import com.dyu.moviehub.dto.request.ChangePasswordRequest;
import com.dyu.moviehub.dto.request.UserUpdateRequest;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.UserResponse;
import com.dyu.moviehub.dto.response.UserUpdateResponse;
import com.dyu.moviehub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ApiResponse<UserResponse> getMyProfile() {
        return ApiResponse.<UserResponse>builder()
                .data(userService.getMyProfile())
                .build();
    }

    @PutMapping("/me")
    public ApiResponse<UserUpdateResponse> updateMyProfile(@RequestBody UserUpdateRequest request) {
        return ApiResponse.<UserUpdateResponse>builder()
                .data(userService.updateProfile(request))
                .build();
    }

    @PatchMapping("/me/change-password")
    public ApiResponse<Void> changePassword(@Valid @RequestBody ChangePasswordRequest request) {
        userService.changePassword(request);
        return ApiResponse.<Void>builder()
                .message("Password changed successfully")
                .build();
    }
}
