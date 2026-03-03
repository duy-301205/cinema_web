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
public class BookingSnackId implements Serializable {

    @Column(name = "booking_id")
    private Long bookingId;

    @Column(name = "snack_id")
    private Long snackId;
}
