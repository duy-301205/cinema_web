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
    EMAIL_REQUIRED(2006, "Email is required", HttpStatus.BAD_REQUEST),
    EMAIL_ALREADY_EXISTS(2002, "Email already exists", HttpStatus.BAD_REQUEST),
    INVALID_EMAIL(2004, "Invalid email format", HttpStatus.BAD_REQUEST),
    USERNAME_EXISTS(2003, "Username already exists", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(2008, "Username must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),

    PASSWORD_REQUIRED(2007, "Password is required", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(2009, "Password must be between {min} and {max} characters", HttpStatus.BAD_REQUEST),

    FULLNAME_REQUIRED(1010, "Full name is required", HttpStatus.BAD_REQUEST),
    FULLNAME_INVALID(1011, "Full name must be between 2 and 100 characters", HttpStatus.BAD_REQUEST),
    PHONE_REQUIRED(1013, "Phone number is required", HttpStatus.BAD_REQUEST),
    INVALID_PHONE_NUMBER(1012, "Phone number must be exactly 10 digits", HttpStatus.BAD_REQUEST),

    MOVIE_TITLE_REQUIRED(3005, "Movie title cannot be blank", HttpStatus.BAD_REQUEST),
    DURATION_REQUIRED(3006, "Movie duration is required", HttpStatus.BAD_REQUEST),
    DURATION_INVALID(3007, "Duration must be at least {value} minutes", HttpStatus.BAD_REQUEST),
    RELEASE_DATE_REQUIRED(3008, "Release date is required", HttpStatus.BAD_REQUEST),
    MOVIE_ALREADY_EXISTS(3009, "Movie already exists", HttpStatus.BAD_REQUEST),
    MOVIE_NOT_FOUND(3010, "Movie not found", HttpStatus.BAD_REQUEST);
    private final int code;
    private final String message;
    private final HttpStatus httpStatus;

    ErrorCode(int code, String message, HttpStatus httpStatus) {
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }
}
