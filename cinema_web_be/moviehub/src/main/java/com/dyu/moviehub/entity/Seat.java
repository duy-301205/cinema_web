package com.dyu.moviehub.entity;

import com.dyu.moviehub.enums.SeatType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "seats")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;

    @Column(name = "row_name", nullable = false, length = 5)
    private String rowName;

    @Column(name = "seat_number", nullable = false)
    private Integer seatNumber;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(name = "type", nullable = false, length = 20)
    private SeatType type = SeatType.NORMAL;

    @Builder.Default
    @Column(name = "extra_price", precision = 10, scale = 2)
    private BigDecimal extraPrice = BigDecimal.ZERO;

    @Builder.Default
    @Column(name = "status", nullable = false)
    private Boolean status = true;
}