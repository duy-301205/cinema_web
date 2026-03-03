package com.dyu.moviehub.exception;


import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {

    UNCATEGORIZED(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1000, "Uncategorized error key", HttpStatus.BAD_REQUEST),
    VALIDATION_FAILED(1001, "Validation failed", HttpStatus.BAD_REQUEST),

    UNAUTHENTICATED(6001, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(6002, "You do not have permission", HttpStatus.UNAUTHORIZED),

    USER_NOT_FOUND(2001, "User not found", HttpStatus.NOT_FOUND),
    EMAIL_ALREADY_EXISTS(2002, "Email already exists", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTS(2003, "Username already exists", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(2008, "Username must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(2009, "Password must be between {min} and {max} characters", HttpStatus.BAD_REQUEST);


    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
