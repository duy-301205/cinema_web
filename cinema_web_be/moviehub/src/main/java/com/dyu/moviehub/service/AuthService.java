package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.LoginRequest;
import com.dyu.moviehub.dto.request.RefreshTokenRequest;
import com.dyu.moviehub.dto.request.RegisterRequest;
import com.dyu.moviehub.dto.response.AuthenticationResponse;
import com.dyu.moviehub.dto.response.RegisterResponse;
import com.dyu.moviehub.entity.InvalidatedToken;
import com.dyu.moviehub.entity.User;
import com.dyu.moviehub.enums.Role;
import lombok.extern.slf4j.Slf4j;
import com.dyu.moviehub.exception.AppException;
import com.dyu.moviehub.exception.ErrorCode;
import com.dyu.moviehub.mapper.UserMapper;
import com.dyu.moviehub.repository.InvalidedTokenRepository;
import com.dyu.moviehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;
    private final InvalidedTokenRepository invalidedTokenRepository;

    public RegisterResponse register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = userMapper.toEntity(registerRequest);

        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return userMapper.toRegisterResponse(user);
    }

    public AuthenticationResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_FOUND));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public AuthenticationResponse refreshToken(RefreshTokenRequest refreshToken) {
        if (invalidedTokenRepository.existsById(refreshToken.getRefreshToken())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if(jwtService.isTokenExpired(refreshToken.getRefreshToken())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        String email = jwtService.extractEmail(refreshToken.getRefreshToken());

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        logout(refreshToken);

        String accessToken = jwtService.generateAccessToken(user);

        String newRefreshToken = jwtService.generateRefreshToken(user);

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public void logout(RefreshTokenRequest request ) {
        String token = request.getRefreshToken();
        try {
            Date expiryTime = jwtService.extractExpiration(token);

            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(token)
                    .expiryTime(expiryTime)
                    .build();

            invalidedTokenRepository.save(invalidatedToken);
            log.info("Token has been invalidated successfully");
        } catch (Exception e) {
            log.warn("Token is already invalid or expired: {}", e.getMessage());
        }
    }
}
