package com.dyu.moviehub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.OffsetDateTime;
import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Table(name = "studios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Studio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "logo_url", columnDefinition = "TEXT")
    private String logoUrl;

    @Column(name = "logo_public_id", length = 255)
    private String logoPublicId;

    @Column(name = "country", length = 100)
    private String country;

    @Column(name = "created_at")
    private OffsetDateTime createdAt;

    @ManyToMany(mappedBy = "studios", fetch = FetchType.LAZY)
    private List<Movie> movies;
}
