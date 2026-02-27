package com.dyu.moviehub.controller;

import com.cloudinary.Cloudinary;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.CloudinaryResponse;
import com.dyu.moviehub.service.CloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
