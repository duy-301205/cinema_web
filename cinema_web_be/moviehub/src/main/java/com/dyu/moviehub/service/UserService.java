package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.ChangePasswordRequest;
import com.dyu.moviehub.dto.request.UserUpdateRequest;
import com.dyu.moviehub.dto.response.UserResponse;
import com.dyu.moviehub.dto.response.UserUpdateResponse;
import com.dyu.moviehub.entity.User;
import com.dyu.moviehub.mapper.UserMapper;
import com.dyu.moviehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    public UserUpdateResponse updateProfile(UserUpdateRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        userMapper.updateUserFromRequest(request, user);
        User updateUser = userRepository.save(user);

        return userMapper.toUserUpdateResponse(updateUser);
    }

    public UserResponse getMyProfile() {
        var authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return userMapper.toUserResponse(user);
    }

    public void changePassword(ChangePasswordRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(!passwordEncoder.matches(request.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Old password not match");
        }

        if(!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("New password not match");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
    }
}
