package com.dyu.moviehub.dto.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ImageListResponse {
    private List<CloudinaryResponse> images;
    private String nextCursor;
}
