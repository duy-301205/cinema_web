package com.dyu.moviehub.entity;

import com.dyu.moviehub.enums.BookingStatus;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "showtime_id", nullable = false)
    private Showtime showtime;

    @Column(name = "total_price", nullable = false)
    private Double totalPrice;

    @CreationTimestamp
    @Column(name = "booking_time")
    private LocalDateTime bookingTime;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "transaction_id")
    private String transactionId;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    // Optional: Có thể thêm List<Ticket> để truy xuất ngược từ Booking ra vé
    // @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL)
    // private List<Ticket> tickets;
}
