package com.dyu.moviehub.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.api.ApiResponse;
import com.cloudinary.utils.ObjectUtils;
import com.dyu.moviehub.dto.response.CloudinaryResponse;
import com.dyu.moviehub.dto.response.ImageListResponse;
import com.dyu.moviehub.exception.AppException;
import com.dyu.moviehub.exception.ErrorCode;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryResponse uploadImage(MultipartFile file) {
        try {
            if(file.isEmpty()) throw new RuntimeException("File is empty");

            Map options = ObjectUtils.asMap(
                    "folder", "movie_posters",
                    "resource_type", "auto"
            );

            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), options);

            String publicId = (String) uploadResult.get("public_id");
            String secureUrl = (String) uploadResult.get("secure_url");

            if (publicId == null || secureUrl == null) {
                throw new RuntimeException("Cloudinary upload failed");
            }

            return CloudinaryResponse.builder()
                    .publicId(publicId)
                    .url(secureUrl)
                    .status("SUCCESS")
                    .build();
        } catch (java.io.IOException e) {
            throw new RuntimeException(e);
        }
    }

    public ImageListResponse getAllImages(String nextCursor) {
        try {
            ApiResponse response = cloudinary.api().resources(ObjectUtils.asMap(
                    "type", "upload",
                    "prefix", "movie_posters/",
                    "max_results", 20,
                    "next_cursor", nextCursor
            ));

            List<Map> resourses = (List<Map>) response.get("resources");

            if(resourses == null || resourses.isEmpty()) {
                throw new AppException(ErrorCode.IMAGES_NOT_FOUND);
            }

            List<CloudinaryResponse> imageList = resourses.stream()
                    .map(res -> CloudinaryResponse.builder()
                            .publicId((String) res.get("public_id"))
                            .url((String) res.get("secure_url"))
                            .status("SUCCESS")
                            .build())
                    .toList();

            return ImageListResponse.builder()
                    .images(imageList)
                    .nextCursor((String) response.get("next_cursor"))
                    .build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.IMAGES_NOT_FOUND);
        }
    }

    public void deleteImage(String public_Id) {
        try {
            cloudinary.uploader().destroy(public_Id, ObjectUtils.emptyMap());
        } catch (IOException | java.io.IOException e) {
            throw new RuntimeException(e);
        }
    }

}
