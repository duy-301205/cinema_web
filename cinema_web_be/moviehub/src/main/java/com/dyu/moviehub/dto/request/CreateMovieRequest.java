package com.dyu.moviehub.dto.request;

import com.dyu.moviehub.enums.MovieStatus;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateMovieRequest {

    @NotBlank(message = "MOVIE_TITLE_REQUIRED")
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

    @NotNull(message = "DURATION_REQUIRED")
    @Min(value = 1, message = "DURATION_INVALID")
    private Integer durationMinutes;

    @NotNull(message = "RELEASE_DATE_REQUIRED")
    private LocalDate releaseDate;

    private BigDecimal budget;
    private MovieStatus status;

    private List<Long> directorIds;
    private List<Long> studioIds;

    private List<Long> actorIds;
}
