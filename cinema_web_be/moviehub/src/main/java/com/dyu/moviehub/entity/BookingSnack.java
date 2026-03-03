package com.dyu.moviehub.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Table(name = "booking_snacks")
@Data
public class BookingSnack {

    @EmbeddedId
    private BookingSnackId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("bookingId")
    @JoinColumn(name = "booking_id")
    private Booking booking;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("snackId")
    @JoinColumn(name = "snack_id")
    private Snack snack;

    @Column(nullable = false)
    private Integer quantity;

    @Column(name = "price_at_booking", nullable = false)
    private BigDecimal priceAtBooking;
}
