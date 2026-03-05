package com.dyu.moviehub.service;

import com.cloudinary.Cloudinary;
import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.exception.AppException;
import com.dyu.moviehub.exception.ErrorCode;
import com.dyu.moviehub.mapper.MovieMapper;
import com.dyu.moviehub.repository.DirectorRepository;
import com.dyu.moviehub.repository.MovieRepository;
import com.dyu.moviehub.repository.StudioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MovieService {

    private final MovieRepository movieRepository;
    private final MovieMapper movieMapper;
    private final CloudinaryService cloudinaryService;
    private final DirectorRepository directorRepository;
    private final StudioRepository studioRepository;

    @Transactional
    public CreateMovieResponse createMovie(CreateMovieRequest request) {
        if (movieRepository.existsByTitle(request.getTitle())) {
            throw new AppException(ErrorCode.MOVIE_ALREADY_EXISTS);
        }
        Movie movie = movieMapper.toEntity(request);

        if(request.getDirectorIds() != null && !request.getDirectorIds().isEmpty()) {
            var directors = directorRepository.findAllById(request.getDirectorIds());
            movie.setDirectors(directors);
        }

        if (request.getStudioIds() != null && !request.getStudioIds().isEmpty()) {
            var studios = studioRepository.findAllById(request.getStudioIds());
            movie.setStudios(studios);
        }

        return movieMapper.toResponse(movieRepository.save(movie));
    }

    @Transactional
    public CreateMovieResponse uploadMovie(Long id, CreateMovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.MOVIE_NOT_FOUND));

        if(request.getPosterPublicId() != null && movie.getPosterPublicId() != null &&
                !movie.getPosterPublicId().equals(request.getPosterPublicId())) {
            cloudinaryService.deleteImage(movie.getPosterPublicId());
        }

        movieMapper.updateEntityFromRequest(request, movie);

        if (request.getDirectorIds() != null) {
            movie.setDirectors(directorRepository.findAllById(request.getDirectorIds()));
        }

        if (request.getStudioIds() != null) {
            movie.setStudios(studioRepository.findAllById(request.getStudioIds()));
        }

        return movieMapper.toResponse(movieRepository.save(movie));
    }
}
