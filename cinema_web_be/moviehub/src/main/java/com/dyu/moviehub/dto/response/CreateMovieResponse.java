package com.dyu.moviehub.dto.response;

import com.dyu.moviehub.enums.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateMovieResponse {
    private Long id;
    private String title;
    private String synopsis;

    private List<String> genre;

    private String posterUrl;
    private String posterPublicId;
    private String heroImageUrl;
    private String heroImagePublicId;
    private String trailerUrl;
    private String language;
    private String rated;
    private Integer durationMinutes;
    private LocalDate releaseDate;
    private MovieStatus status;

    private List<String> directors;
    private List<String> studios;
    private List<String> actors;

    private OffsetDateTime createdAt;
    private OffsetDateTime updatedAt;
}
