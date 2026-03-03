package com.dyu.moviehub.exception;

import com.dyu.moviehub.dto.response.ApiResponse;
import jakarta.validation.ConstraintViolation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;
import java.util.Objects;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    // Loi he thong chua xac dinh
    @ExceptionHandler(value = Exception.class)
    ResponseEntity<ApiResponse<Object>> handlingException(Exception exception) {
        log.error("Internal Server Error", exception);

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(ErrorCode.UNCATEGORIZED.getCode())
                .message(ErrorCode.UNCATEGORIZED.getMessage())
                .build();
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED.getHttpStatus()).body(apiResponse);
    }

    // Loi logic nghiep vu
    @ExceptionHandler(value = AppException.class)
    ResponseEntity<ApiResponse<Object>> appException(AppException exception) {
        ErrorCode errorCode = exception.getErrorCode();

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    // Loi phan quyen
    @ExceptionHandler(value = AccessDeniedException.class)
    ResponseEntity<ApiResponse<Object>> accessDeniedException(AccessDeniedException exception) {
        ErrorCode errorCode = ErrorCode.UNAUTHORIZED;

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(errorCode.getMessage())
                .build();
        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    // Loi validate dau vao (@Valid, @Size)
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Object>> methodArgumentNotValidException(MethodArgumentNotValidException exception) {
        String enumKey = exception.getFieldError().getDefaultMessage();
        ErrorCode errorCode = ErrorCode.INVALID_KEY;
        Map<String, Object> attributes = null;

        try {
            errorCode = ErrorCode.valueOf(enumKey);

            var constraintViolation = exception.getBindingResult()
                    .getAllErrors().getFirst().unwrap(ConstraintViolation.class);
            attributes = constraintViolation.getConstraintDescriptor().getAttributes();
        } catch (IllegalArgumentException e) {
            log.warn("Validation message '{}' does not match any ErrorCode enum", enumKey);
        }

        ApiResponse<Object> apiResponse = ApiResponse.builder()
                .code(errorCode.getCode())
                .message(Objects.nonNull(attributes)
                        ? mapAttribute(errorCode.getMessage(), attributes)
                        : errorCode.getMessage())
                .build();

        return ResponseEntity.status(errorCode.getHttpStatus()).body(apiResponse);
    }

    // helper thay the min, max
    private String mapAttribute(String message, Map<String, Object> attributes) {
        String result = message;
        for (Map.Entry<String, Object> entry : attributes.entrySet()) {
            String key = entry.getKey();
            Object value = entry.getValue();
            if (value != null) {
                result = result.replace("{" + key + "}", value.toString());
            }
        }
        return result;
    }
}
