package com.dyu.moviehub.dto.response;

import com.dyu.moviehub.dto.request.TMDBMovieDto;
import lombok.Data;

import java.util.List;

@Data
public class TMDBResponse {
    List<TMDBMovieDto> results;
}
