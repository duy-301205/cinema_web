package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.mapper.MovieMapper;
import com.dyu.moviehub.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;

    public CreateMovieResponse createMovie(CreateMovieRequest request) {
        if (movieRepository.existsByTitle(request.getTitle())) {
            throw new RuntimeException("Title already exists");
        }
         Movie movie = movieMapper.toEntity(request);
        Movie movieSaved = movieRepository.save(movie);

        return movieMapper.toResponse(movieSaved);
    }
}
