package com.dyu.moviehub.controller;

import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("/post")
    public ApiResponse<CreateMovieResponse> createMovie(@Valid  @RequestBody CreateMovieRequest request) {
        return ApiResponse.<CreateMovieResponse>builder()
                .data(movieService.createMovie(request))
                .build();
    }

    @PutMapping("/update/{id}")
    public ApiResponse<CreateMovieResponse> updateMovie(@PathVariable Long id, @Valid @RequestBody CreateMovieRequest request) {
        return ApiResponse.<CreateMovieResponse>builder()
                .data(movieService.uploadMovie(id, request))
                .build();
    }
}
