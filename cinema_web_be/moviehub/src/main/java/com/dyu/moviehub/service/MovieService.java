package com.dyu.moviehub.service;

import com.cloudinary.Cloudinary;
import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.mapper.MovieMapper;
import com.dyu.moviehub.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final CloudinaryService cloudinaryService;

    @Transactional
    public CreateMovieResponse createMovie(CreateMovieRequest request) {
        if (movieRepository.existsByTitle(request.getTitle())) {
            throw new RuntimeException("Title already exists");
        }
        Movie movie = movieMapper.toEntity(request);

        return movieMapper.toResponse(movieRepository.save(movie));
    }

    public CreateMovieResponse uploadMovie(Long id, CreateMovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));

        if(request.getPosterPublicId() != null && movie.getPosterPublicId().equals(request.getPosterPublicId())) {
            cloudinaryService.deleteImage(movie.getPosterPublicId());
        }

        movieMapper.updateEntityFromRequest(request, movie);

        return movieMapper.toResponse(movieRepository.save(movie));
    }
}
