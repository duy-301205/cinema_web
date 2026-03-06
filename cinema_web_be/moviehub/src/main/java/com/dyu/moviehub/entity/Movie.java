package com.dyu.moviehub.entity;

import com.dyu.moviehub.enums.MovieStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.Type;
import io.hypersistence.utils.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.type.SqlTypes;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "movies")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "external_id", unique = true)
    private Long externalId;

    @Column(name = "title", nullable = false, length = 255)
    private String title;

    @Column(name = "synopsis", columnDefinition = "TEXT")
    private String synopsis;

    @JdbcTypeCode(SqlTypes.ARRAY)
    @Column(name = "genre", columnDefinition = "varchar(100)[]")
    private List<String> genre;

    @Column(name = "poster_url", columnDefinition = "TEXT")
    private String posterUrl;

    @Column(name = "poster_public_id", length = 255)
    private String posterPublicId;

    @Column(name = "hero_image_url", columnDefinition = "TEXT")
    private String heroImageUrl;

    @Column(name = "hero_image_public_id", length = 255)
    private String heroImagePublicId;

    @Column(name = "trailer_url", columnDefinition = "TEXT")
    private String trailerUrl;

    @Builder.Default
    @Column(name = "language", length = 50)
    private String language = "English (EN)";

    @Column(name = "rated", length = 10)
    private String rated;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "release_date", nullable = false)
    private LocalDate releaseDate;

    @Builder.Default
    @Column(name = "budget", precision = 15, scale = 2)
    private BigDecimal budget = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "revenue", precision = 15, scale = 2)
    private BigDecimal revenue = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "avg_rating", precision = 3, scale = 1)
    private BigDecimal avgRating = BigDecimal.valueOf(0.0);

    @Builder.Default
    @Column(name = "total_reviews")
    private Integer totalReviews = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    private MovieStatus status = MovieStatus.SHOWING;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "movie_directors",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "director_id")
    )
    private List<Director> directors;

    @ManyToMany
    @JoinTable(
            name = "movie_actors",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "actor_id")
    )
    private List<Actor> actors;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "movie_studios",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "studio_id")
    )
    private List<Studio> studios;
}

