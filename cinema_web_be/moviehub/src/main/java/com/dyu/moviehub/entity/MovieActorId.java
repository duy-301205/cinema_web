package com.dyu.moviehub.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MovieActorId implements Serializable {
    @Column(name = "movie_id")
    private Long movieId;

    @Column(name = "actor_id")
    private Long actorId;
}
