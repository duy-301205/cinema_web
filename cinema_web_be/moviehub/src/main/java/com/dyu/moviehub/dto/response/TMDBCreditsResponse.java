package com.dyu.moviehub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TMDBCreditsResponse {
    private List<CastDto> cast;
    private List<CrewDto> crew;

    @Data public static class CastDto { private String name; }
    @Data public static class CrewDto { private String name; private String job; }
}
