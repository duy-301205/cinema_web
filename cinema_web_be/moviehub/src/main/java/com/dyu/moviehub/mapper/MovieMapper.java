package com.dyu.moviehub.mapper;

import com.dyu.moviehub.dto.request.CreateMovieRequest;
import com.dyu.moviehub.dto.response.CreateMovieResponse;
import com.dyu.moviehub.entity.Actor;
import com.dyu.moviehub.entity.Director;
import com.dyu.moviehub.entity.Movie;
import com.dyu.moviehub.entity.Studio;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MovieMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "directors", ignore = true)
    @Mapping(target = "studios", ignore = true)
    @Mapping(target = "actors", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Movie toEntity(CreateMovieRequest request);

    @Mapping(target = "directors", source = "directors")
    @Mapping(target = "studios", source = "studios")
    @Mapping(target = "actors", source = "actors")
    CreateMovieResponse toResponse(Movie movie);

    default List<String> mapDirectors(List<Director> value) {
        if (value == null) return null;
        return value.stream().map(Director::getName).collect(Collectors.toList());
    }

    default List<String> mapStudios(List<Studio> value) {
        if (value == null) return null;
        return value.stream().map(Studio::getName).collect(Collectors.toList());
    }

    default List<String> mapActors(List<Actor> value) {
        if (value == null) return null;
        return value.stream()
                .map(Actor::getName)
                .collect(Collectors.toList());
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "directors", ignore = true)
    @Mapping(target = "studios", ignore = true)
    @Mapping(target = "actors", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(CreateMovieRequest request, @MappingTarget Movie movie);
}
