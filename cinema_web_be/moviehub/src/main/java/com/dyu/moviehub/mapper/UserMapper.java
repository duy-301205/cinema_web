package com.dyu.moviehub.mapper;

import com.dyu.moviehub.dto.request.RegisterRequest;
import com.dyu.moviehub.dto.request.UserUpdateRequest;
import com.dyu.moviehub.dto.response.LoginResponse;
import com.dyu.moviehub.dto.response.RegisterResponse;
import com.dyu.moviehub.dto.response.UserResponse;
import com.dyu.moviehub.dto.response.UserUpdateResponse;
import com.dyu.moviehub.entity.User;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "role", ignore = true)
    @Mapping(target = "avatarUrl", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "password", ignore = true)
    User toEntity(RegisterRequest request);

    RegisterResponse toRegisterResponse(User user);

    @Mapping(source = "token", target = "token")
    @Mapping(source = "message", target = "message")
    LoginResponse toAuthResponse(User user, String token, String message);

    UserUpdateResponse toUserUpdateResponse(User user);
    UserResponse toUserResponse(User user);
    // Cac truong null se khong map
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateUserFromRequest(UserUpdateRequest request, @MappingTarget User user);
}
