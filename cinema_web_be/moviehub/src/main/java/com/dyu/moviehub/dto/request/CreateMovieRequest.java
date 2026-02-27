package com.dyu.moviehub.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateMovieRequest {

    @NotBlank(message = "Title not null")
    private String title;

    private String description;
    private String director;
    private String actor;
    private String genre;
    private String posterUrl;
    private String trailerUrl;
    private String language;
    private String rated;

    @Min(value = 1, message = "Duration time less 1 minutes")
    private Integer durationMinutes;

    @NotNull(message = "Release date not null")
    private LocalDate releaseDate;

    private String status;
}
