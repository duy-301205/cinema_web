package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.LoginRequest;
import com.dyu.moviehub.dto.request.RegisterRequest;
import com.dyu.moviehub.dto.response.LoginResponse;
import com.dyu.moviehub.dto.response.RegisterResponse;
import com.dyu.moviehub.entity.User;
import com.dyu.moviehub.enums.Role;
import com.dyu.moviehub.mapper.UserMapper;
import com.dyu.moviehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final UserMapper userMapper;

    public RegisterResponse register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        User user = userMapper.toEntity(registerRequest);

        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole(Role.CUSTOMER);

        userRepository.save(user);

        return userMapper.toRegisterResponse(user);
    }

    public LoginResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElseThrow(() -> new RuntimeException("Email not found"));

        if(!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new RuntimeException("Incorrect password");
        }

        String token = jwtService.generateToken(user);
        return userMapper.toAuthResponse(user,token, "success");
    }

}
