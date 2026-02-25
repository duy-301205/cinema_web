package com.dyu.moviehub.controller;

import com.dyu.moviehub.dto.request.LoginRequest;
import com.dyu.moviehub.dto.request.RegisterRequest;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.LoginResponse;
import com.dyu.moviehub.dto.response.RegisterResponse;
import com.dyu.moviehub.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ApiResponse<RegisterResponse> register(@Valid @RequestBody RegisterRequest registerRequest) {
        return ApiResponse.<RegisterResponse>builder()
                .data(authService.register(registerRequest))
                .message("Success")
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        return ApiResponse.<LoginResponse>builder()
                .data(authService.login(request))
                .message("Success")
                .build();
    }
}
