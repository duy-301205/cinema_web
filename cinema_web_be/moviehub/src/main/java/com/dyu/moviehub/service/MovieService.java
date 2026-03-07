package com.dyu.moviehub.service;

import com.dyu.moviehub.dto.request.TMDBMovieDto;
import com.dyu.moviehub.dto.response.MovieImportResponse;
import com.dyu.moviehub.dto.response.TMDBCreditsResponse;
import com.dyu.moviehub.dto.response.TMDBResponse;
import com.dyu.moviehub.entity.Actor;
import com.dyu.moviehub.entity.Director;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.entity.Studio;
import com.dyu.moviehub.mapper.MovieMapper;
import com.dyu.moviehub.repository.ActorRepository;
import com.dyu.moviehub.repository.DirectorRepository;
import com.dyu.moviehub.repository.MovieRepository;
import com.dyu.moviehub.repository.StudioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class MovieService {
    private final MovieRepository movieRepository;
    private final ActorRepository actorRepository;
    private final DirectorRepository directorRepository;
    private final StudioRepository studioRepository;
    private final RestTemplate restTemplate;
    private final MovieMapper movieMapper;

    @Value("${tmdb.api.key}")
    private String apiKey;

    @Value("${tmdb.base.url}")
    private String baseUrl;

    @Value("${tmdb.image.url}")
    private String imageUrl;

    @Transactional
    public List<MovieImportResponse> importMovies(String query) {
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

        List<MovieImportResponse> movies = new ArrayList<>();

        for(CompletableFuture<Movie> movieFuture : futures) {
            Movie movie = movieFuture.join();
            Movie saved = movieRepository.save(movie);
            movies.add(movieMapper.toImportResponse(saved));
        }
        return movies;
    }

    private LocalDate safeParseDate(String dateStr) {
        if (dateStr == null || dateStr.isEmpty()) {
            return LocalDate.of(1970, 1, 1);
        }
        try {
            return LocalDate.parse(dateStr);
        } catch (Exception e) {
            return LocalDate.of(1970, 1, 1);
        }
    }

    @Async("tmdbExecutor")
    public CompletableFuture<Movie> processSingleMovieAsync(TMDBMovieDto searchDto, Map<Integer, String> genreMap) {
        // URL cho cac API con
        String detailUrl = baseUrl + "/movie/" + searchDto.getId() + "?api_key=" + apiKey + "&language=vi-VN";
        String creditUrl = baseUrl + "/movie/" + searchDto.getId() + "/credits?api_key=" + apiKey;

        // Ban 2 request đi cung 1 luc
        CompletableFuture<TMDBMovieDto> detailFutute = CompletableFuture.supplyAsync(
                () -> restTemplate.getForObject(detailUrl, TMDBMovieDto.class)
        );

        CompletableFuture<TMDBCreditsResponse> creditsFuture = CompletableFuture.supplyAsync(
                () -> restTemplate.getForObject(creditUrl, TMDBCreditsResponse.class)
        );

        CompletableFuture<String> trailerFuture = CompletableFuture.supplyAsync(
                () -> fetchTrailerUrl(searchDto.getId()));

        return CompletableFuture.allOf(detailFutute, creditsFuture, trailerFuture).thenApply(v -> {

            TMDBMovieDto detailData = detailFutute.join();

            String finalSynopsis = detailData.getSynopsis();
            if (finalSynopsis == null || finalSynopsis.trim().isEmpty()) {
                String detailUrlEn = baseUrl + "/movie/" + searchDto.getId() + "?api_key=" + apiKey + "&language=en-US";
                try {
                    TMDBMovieDto detailDataEn = restTemplate.getForObject(detailUrlEn, TMDBMovieDto.class);
                    if (detailDataEn != null) {
                        finalSynopsis = detailDataEn.getSynopsis();
                    }
                } catch (Exception e) {
                    log.error("Không thể lấy synopsis tiếng Anh cho phim {}", searchDto.getId());
                }
            }

            if (finalSynopsis == null || finalSynopsis.trim().isEmpty()) {
                finalSynopsis = searchDto.getSynopsis();
            }

            // Ưu tiên ngày từ Detail, nếu không có lấy từ Search
            String rawDate = (detailData.getReleaseDate() != null && !detailData.getReleaseDate().isEmpty())
                    ? detailData.getReleaseDate()
                    : searchDto.getReleaseDate();
            LocalDate reseaseDate = safeParseDate(rawDate);

            TMDBCreditsResponse creditsData = creditsFuture.join();
            String trailerUrl = trailerFuture.join();

            // Xu li dien vien
            List<Actor> actors = mapActors(creditsData.getCast());
            List<Director> directors = mapDirectors(creditsData.getCrew());
            List<Studio> studios = mapStudios(detailData.getProductionCompanies());

            List<String> genres = searchDto.getGenreIds().stream()
                    .map(id -> genreMap.getOrDefault(id, "Khác"))
                    .toList();

            Movie movie =  movieMapper.toEntity(
                    searchDto,
                    genres,
                    detailData.getRuntime(),
                    actors,
                    directors,
                    studios,
                    imageUrl,
                    reseaseDate);
            movie.setSynopsis(finalSynopsis);
            movie.setTrailerUrl(trailerUrl);

            return movie;
        });
    }

    private String fetchTrailerUrl(Long movieId) {
        String videoUrl = baseUrl + "/movie/" + movieId + "/videos?api_key=" + apiKey;

        try{
            Map<String, Object> videoData = restTemplate.getForObject(videoUrl, Map.class);

            if(videoData != null && videoData.get("results") != null) {
                List<Map<String, Object>> results = (List<Map<String, Object>>) videoData.get("results");

                // Lọc video: Ưu tiên loại "Trailer" và nguồn là "YouTube"
                return results.stream()
                        .filter(v -> "Trailer".equals(v.get("type")) && "YouTube".equals(v.get("site")))
                        .map(v -> "https://www.youtube.com/watch?v=" + v.get("key"))
                        .findFirst()
                        .orElse("");
            }
        } catch (Exception e) {
            log.error("Lỗi lấy trailer cho phim {}: {}", movieId, e.getMessage());
        }
        return "";
    }

    private List<Actor> mapActors(List<TMDBCreditsResponse.CastDto> cast) {
        return cast.stream()
                .limit(5)
                .map(c -> actorRepository.findByName(c.getName())
                        .orElseGet(() -> actorRepository.save(Actor.builder()
                                .name(c.getName()).build())))
                .toList();
    }

    private List<Director> mapDirectors(List<TMDBCreditsResponse.CrewDto> crew) {
        return crew.stream()
                .filter(c -> "Director".equals(c.getJob()))
                .map(c -> directorRepository.findByName(c.getName())
                        .orElseGet(() -> directorRepository.save(Director.builder()
                                .name(c.getName()).build())))
                .toList();
    }

    private List<Studio> mapStudios(List<TMDBMovieDto.NamedDto> companies) {
        if (companies == null) return List.of();
        return companies.stream()
                .map(c -> studioRepository.findByName(c.getName())
                        .orElseGet(() -> studioRepository.save(Studio.builder().name(c.getName()).build())))
                .toList();
    }

    private Map<Integer, String> fetchGenreMap() {
        String url = baseUrl + "/genre/movie/list?api_key=" + apiKey + "&language=vi-VN";

        Map<String, Object> resp = restTemplate.getForObject(url, Map.class);

        List<Map<String, Object>> genreList = (List<Map<String, Object>>) resp.get("genres");

        Map<Integer, String> genreMap = new HashMap<>();

        for(Map<String, Object> genre : genreList) {
            Integer id = (Integer) genre.get("id");
            String genreName = (String) genre.get("name");
            genreMap.put(id, genreName);
        }

        return genreMap;
    }
}
