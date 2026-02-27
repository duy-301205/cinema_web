package com.dyu.moviehub.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dyu.moviehub.dto.response.CloudinaryResponse;
import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

            return CloudinaryResponse.builder()
                    .publicId(uploadResult.get("public_id").toString())
                    .url(uploadResult.get("secure_url").toString())
                    .status(uploadResult.get("SUCCESS").toString())
                    .build();
        } catch (java.io.IOException e) {
            throw new RuntimeException(e);
        }
    }

}
