package com.dyu.moviehub.dto.response;

import com.dyu.moviehub.enums.MovieStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateMovieResponse {
    private Long id;
    private String title;
    private String description;
    private String actor;
    private String genre;
    private String posterPublicId;
    private String posterUrl;
    private String trailerUrl;
    private String language;
    private Integer durationMinutes;
    private LocalDate releaseDate;
    private MovieStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
