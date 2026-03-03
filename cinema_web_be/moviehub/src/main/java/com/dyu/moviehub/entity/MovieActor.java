package com.dyu.moviehub.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "movie_actors")
@Data
public class MovieActor {

    @EmbeddedId
    private MovieActorId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("movieId")
    @JoinColumn(name = "movie_id")
    private Movie movie;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("actorId")
    @JoinColumn(name = "actor_id")
    private Actor actor;

    @Column(name = "character_name")
    private String characterName;
}
