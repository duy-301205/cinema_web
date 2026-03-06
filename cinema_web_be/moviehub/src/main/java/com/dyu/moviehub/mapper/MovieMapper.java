package com.dyu.moviehub.mapper;

import com.dyu.moviehub.dto.request.TMDBMovieDto;
import com.dyu.moviehub.entity.Actor;
import com.dyu.moviehub.entity.Director;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.entity.Studio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MovieMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "externalId", source = "dto.id")
    @Mapping(target = "synopsis", source = "dto.synopsis")
    @Mapping(target = "genre", source = "genreNames")
    @Mapping(target = "durationMinutes", source = "runtime")
    @Mapping(target = "avgRating", expression = "java(java.math.BigDecimal.valueOf(dto.getVoteAverage()))")
    @Mapping(target = "posterUrl", expression = "java(imgUrl + dto.getPosterPath())")
    @Mapping(target = "heroImageUrl", expression = "java(imgUrl + dto.getBackdropPath())")
    @Mapping(target = "status", constant = "SHOWING")
    Movie toEntity(TMDBMovieDto dto, List<String> genreNames, Integer runtime,
                   List<Actor> actors, List<Director> directors, List<Studio> studios, String imgUrl);
}
