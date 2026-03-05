package com.dyu.moviehub.controller;

import com.cloudinary.Cloudinary;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.CloudinaryResponse;
import com.dyu.moviehub.dto.response.ImageListResponse;
import com.dyu.moviehub.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/files")
@RequiredArgsConstructor
public class FileUploadController {

    private final CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ApiResponse<CloudinaryResponse> fileUpload(@RequestParam("file") MultipartFile file) {
        return ApiResponse.<CloudinaryResponse>builder()
                .data(cloudinaryService.uploadImage(file))
                .build();
    }

    @GetMapping("/all")
    public ApiResponse<ImageListResponse> getAllImages(@RequestParam(required = false) String nextCursor) {
        return ApiResponse.<ImageListResponse>builder()
                .data(cloudinaryService.getAllImages(nextCursor))
                .build();
    }
}
