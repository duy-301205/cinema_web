package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.TMDBMovieDto;
import com.dyu.moviehub.dto.response.TMDBResponse;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.repository.ActorRepository;
import com.dyu.moviehub.repository.DirectorRepository;
import com.dyu.moviehub.repository.MovieRepository;
import com.dyu.moviehub.repository.StudioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;
    private final DirectorRepository directorRepository;
    private final StudioRepository studioRepository;
    private final RestTemplate restTemplate;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.base.url}")
    private String baseUrl;

    @Value("${tmdb.image.url}")
    private String imageUrl;

    @Transactional
    public List<Movie> importMovies(String query) {
        Map<Integer, String> genreMap = fetchGenreMap();
        String url = baseUrl + "/search/movie?api_key=" + apiKey + "&query=" + query + "&language=vi-VN";
        TMDBResponse searchResp = restTemplate.getForObject(url, TMDBResponse.class);

        if(searchResp == null || searchResp.getResults() == null) return List.of();

        List<CompletableFuture<Movie>> futures = new ArrayList<>();

        for(TMDBMovieDto movieDto : searchResp.getResults()) {
            if(movieRepository.existsByExternalId(movieDto.getId())) {
                continue;
            }

            CompletableFuture<Movie> future = processSingleMovieAsync(movieDto, genreMap);

            futures.add(future);
        }

        List<Movie> movies = new ArrayList<>();

        for(CompletableFuture<Movie> movieFuture : futures) {
            Movie movie = movieFuture.join();
            movies.add(movieRepository.save(movie));
        }
        return movies;
    }

    @Async("tmdbExecutor")
    public CompletableFuture<Movie> processSingleMovieAsync(TMDBMovieDto dto, Map<Integer, String> genreMap) {
        String detailUrl = baseUrl + "/movie/" + dto.getId() + "?api_key=" + apiKey;
        String creditUrl = baseUrl + "/movie/" + dto.getId() + "/credits?api_key=" + apiKey;


    }

    private Map<Integer, String> fetchGenreMap() {
        String url = baseUrl + "/genre/movie/list?api_key=" + apiKey + "&language=vi-VN";

        Map<String, Object> resp = restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> genreList = (List<Map<String, Object>>) resp.get("genre");

        Map<Integer, String> genreMap = new HashMap<>();

        for(Map<String, Object> genre : genreList) {
            Integer id = (Integer) genre.get("id");
            String genreName = (String) genre.get("name");
            genreMap.put(id, genreName);
        }

        return genreMap;
    }
}
