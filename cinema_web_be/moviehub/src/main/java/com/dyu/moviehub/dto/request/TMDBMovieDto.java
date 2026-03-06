package com.dyu.moviehub.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TMDBMovieDto {

    private Long id;

    @JsonProperty("title")
    private String title;

    @JsonProperty("overview")
    private String synopsis;

    @JsonProperty("genre_ids")
    private List<Integer> genreIds;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    @JsonProperty("release_date")
    private String releaseDate;

    @JsonProperty("vote_average")
    private Double voteAverage;

    @JsonProperty("original_language")
    private String language;

    @JsonProperty("runtime")
    private Integer runtime;

    @JsonProperty("production_companies")
    private List<NamedDto> productionCompanies;

    @Data public static class NamedDto { private String name; }
}
