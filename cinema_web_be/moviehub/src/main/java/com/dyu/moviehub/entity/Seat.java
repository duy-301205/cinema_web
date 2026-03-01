package com.dyu.moviehub.entity;

import com.dyu.moviehub.enums.SeatType;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "seats")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "row_name", nullable = false)
    private String rowName;

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;

    @Enumerated(EnumType.STRING)
    private SeatType seatType;

    @Column(name = "extra_price")
    private Double extraPrice;

    private Boolean status;
}
