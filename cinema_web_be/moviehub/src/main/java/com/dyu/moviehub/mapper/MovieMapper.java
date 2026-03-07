package com.dyu.moviehub.mapper;

import com.dyu.moviehub.dto.request.TMDBMovieDto;
import com.dyu.moviehub.dto.response.MovieImportResponse;
import com.dyu.moviehub.entity.Actor;
import com.dyu.moviehub.entity.Director;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.entity.Studio;
import com.dyu.moviehub.enums.MovieStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.time.LocalDate;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "dto.id")
    @Mapping(target = "synopsis", source = "dto.synopsis")
    @Mapping(target = "genre", source = "genreNames")
    @Mapping(target = "durationMinutes", expression = "java(runtime == null || runtime <= 0 ? 0 : runtime)")
    @Mapping(target = "releaseDate", source = "releaseDate")
    @Mapping(target = "avgRating", expression = "java(java.math.BigDecimal.valueOf(dto.getVoteAverage()))")
    @Mapping(target = "posterUrl", expression = "java(dto.getPosterPath() != null ? imgUrl + dto.getPosterPath() : null)")
    @Mapping(target = "heroImageUrl", expression = "java(dto.getBackdropPath() != null ? imgUrl + dto.getBackdropPath() : null)")
    @Mapping(target = "status", expression = "java(calculateStatus(releaseDate))")
    Movie toEntity(TMDBMovieDto dto, List<String> genreNames, Integer runtime,
                   List<Actor> actors, List<Director> directors, List<Studio> studios, String imgUrl, LocalDate releaseDate);

    default MovieStatus calculateStatus(LocalDate releaseDate) {
        if(releaseDate == null) return MovieStatus.STOPPED;

        LocalDate now = LocalDate.now();

        if (releaseDate.isAfter(now)) {
            return MovieStatus.COMING_SOON;
        } else if (releaseDate.isAfter(now.minusMonths(3))) {
            return MovieStatus.SHOWING;
        } else {
            return MovieStatus.STOPPED;
        }
    }
    @Mapping(target = "trailerUrl", source = "trailerUrl")
    @Mapping(target = "actors", expression = "java(mapActorNames(movie.getActors()))")
    @Mapping(target = "directors", expression = "java(mapDirectorNames(movie.getDirectors()))")
    @Mapping(target = "studios", expression = "java(mapStudioNames(movie.getStudios()))")
    MovieImportResponse toImportResponse(Movie movie);

    default List<String> mapActorNames(List<Actor> actors) {
        if (actors == null) return null;
        return actors.stream().map(Actor::getName).toList();
    }

    default List<String> mapDirectorNames(List<Director> directors) {
        if (directors == null) return null;
        return directors.stream().map(Director::getName).toList();
    }

    default List<String> mapStudioNames(List<Studio> studios) {
        if (studios == null) return null;
        return studios.stream().map(Studio::getName).toList();
    }

}
