package com.dyu.moviehub.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "rooms", uniqueConstraints = {
        @UniqueConstraint(name = "uq_room_name", columnNames = {"cinema_id", "name"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_id", nullable = false)
    private Cinema cinema;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Builder.Default
    @Column(name = "type", nullable = false, length = 20)
    private String type = "STANDARD";

    @Builder.Default
    @Column(name = "total_seats", nullable = false)
    private Integer totalSeats = 0;

    @Builder.Default
    @Column(name = "total_rows", nullable = false)
    private Integer totalRows = 10;

    @Builder.Default
    @Column(name = "total_columns", nullable = false)
    private Integer totalColumns = 12;

    @Builder.Default
    @Column(name = "status", nullable = false)
    private Boolean status = true;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Seat> seats;

    @OneToMany(mappedBy = "room", fetch = FetchType.LAZY)
    private List<Showtime> showtimes;
}