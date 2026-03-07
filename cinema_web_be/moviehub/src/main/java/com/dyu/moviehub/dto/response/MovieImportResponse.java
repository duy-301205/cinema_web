package com.dyu.moviehub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MovieImportResponse {
    private Long id;
    private Long externalId;
    private String title;
    private String synopsis;
    private List<String> genre;
    private String posterUrl;
    private String heroImageUrl;
    private String trailerUrl;
    private String language;
    private Integer durationMinutes;
    private LocalDate releaseDate;
    private BigDecimal avgRating;
    private String status;

    private List<String> actors;
    private List<String> directors;
    private List<String> studios;
}
