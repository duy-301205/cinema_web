package com.dyu.moviehub.controller;

import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.ApiResponse;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.dto.response.MovieImportResponse;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    @PostMapping("/import")
    public ApiResponse<List<MovieImportResponse>> importFromTMDB(@RequestParam String query) {
        return ApiResponse.<List<MovieImportResponse>>builder()
                .data(movieService.importMovies(query))
                .build();
    }
}
