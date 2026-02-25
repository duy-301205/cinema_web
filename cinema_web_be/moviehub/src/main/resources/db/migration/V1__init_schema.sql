
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- =====================================================
-- 1. USERS
-- =====================================================
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       full_name VARCHAR(100) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       avatar_url TEXT,
                       phone VARCHAR(20),
                       role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
                       CONSTRAINT chk_users_role CHECK (role IN ('CUSTOMER', 'ADMIN', 'STAFF')),
                       created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Auto update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. MOVIES
-- =====================================================
CREATE TABLE movies (
                        id BIGSERIAL PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        description TEXT,
                        director VARCHAR(100),
                        actor TEXT,
                        genre VARCHAR(100),
                        poster_url TEXT,
                        trailer_url TEXT,
                        language VARCHAR(50),
                        rated VARCHAR(10),
                        duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
                        release_date DATE NOT NULL,
                        status VARCHAR(20) NOT NULL DEFAULT 'SHOWING',
                        CONSTRAINT chk_movies_status CHECK (status IN ('COMING_SOON', 'SHOWING', 'STOPPED')),
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_movies_updated_at
    BEFORE UPDATE ON movies
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 3. CINEMAS
-- =====================================================
CREATE TABLE cinemas (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         address TEXT NOT NULL,
                         city VARCHAR(50) NOT NULL,
                         hotline VARCHAR(20),
                         description TEXT,
                         status BOOLEAN NOT NULL DEFAULT TRUE,
                         created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 4. ROOMS
-- =====================================================
CREATE TABLE rooms (
                       id BIGSERIAL PRIMARY KEY,
                       cinema_id BIGINT NOT NULL,
                       name VARCHAR(50) NOT NULL,
                       type VARCHAR(20) NOT NULL DEFAULT 'STANDARD',
                       total_seats INT NOT NULL DEFAULT 0,
                       total_rows INT NOT NULL DEFAULT 10,
                       total_columns INT NOT NULL DEFAULT 12,
                       status BOOLEAN NOT NULL DEFAULT TRUE,
                       CONSTRAINT fk_rooms_cinema FOREIGN KEY (cinema_id)
                           REFERENCES cinemas(id) ON DELETE CASCADE,
                       CONSTRAINT uq_room_name UNIQUE (cinema_id, name)
);

-- =====================================================
-- 5. SEATS
-- =====================================================
CREATE TABLE seats (
                       id BIGSERIAL PRIMARY KEY,
                       room_id BIGINT NOT NULL,
                       row_name VARCHAR(5) NOT NULL,
                       seat_number INT NOT NULL,
                       type VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
                       CONSTRAINT chk_seats_type CHECK (type IN ('NORMAL', 'VIP', 'COUPLE')),
                       status BOOLEAN NOT NULL DEFAULT TRUE,
                       CONSTRAINT fk_seats_room FOREIGN KEY (room_id)
                           REFERENCES rooms(id) ON DELETE CASCADE,
                       CONSTRAINT uq_seat_position UNIQUE (room_id, row_name, seat_number)
);

-- =====================================================
-- 6. SHOWTIMES (CHỐNG TRÙNG SUẤT CHIẾU)
-- =====================================================
CREATE TABLE showtimes (
                           id BIGSERIAL PRIMARY KEY,
                           movie_id BIGINT NOT NULL,
                           room_id BIGINT NOT NULL,
                           start_time TIMESTAMP NOT NULL,
                           end_time TIMESTAMP NOT NULL,
                           price DECIMAL(10,2) NOT NULL,
                           status BOOLEAN NOT NULL DEFAULT TRUE,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

                           CONSTRAINT chk_showtime_time CHECK (end_time > start_time),

                           CONSTRAINT fk_showtimes_movie FOREIGN KEY (movie_id)
                               REFERENCES movies(id) ON DELETE CASCADE,

                           CONSTRAINT fk_showtimes_room FOREIGN KEY (room_id)
                               REFERENCES rooms(id) ON DELETE CASCADE
);

-- Chống overlap showtime cùng phòng
ALTER TABLE showtimes
    ADD CONSTRAINT no_overlapping_showtimes
    EXCLUDE USING gist (
    room_id WITH =,
    tsrange(start_time, end_time) WITH &&
);

-- =====================================================
-- 7. BOOKINGS
-- =====================================================
CREATE TABLE bookings (
                          id BIGSERIAL PRIMARY KEY,
                          user_id BIGINT NOT NULL,
                          showtime_id BIGINT NOT NULL,
                          total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
                          booking_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          payment_method VARCHAR(50),
                          transaction_id VARCHAR(100),
                          status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                          CONSTRAINT chk_bookings_status CHECK (status IN ('PENDING', 'SUCCESS', 'CANCELLED')),
                          CONSTRAINT fk_bookings_user FOREIGN KEY (user_id)
                              REFERENCES users(id) ON DELETE CASCADE,
                          CONSTRAINT fk_bookings_showtime FOREIGN KEY (showtime_id)
                              REFERENCES showtimes(id) ON DELETE CASCADE
);

-- =====================================================
-- 8. TICKETS (CHỐNG DOUBLE BOOKING)
-- =====================================================
CREATE TABLE tickets (
                         id BIGSERIAL PRIMARY KEY,
                         booking_id BIGINT NOT NULL,
                         seat_id BIGINT NOT NULL,
                         showtime_id BIGINT NOT NULL,
                         price DECIMAL(10,2) NOT NULL,

                         CONSTRAINT fk_tickets_booking FOREIGN KEY (booking_id)
                             REFERENCES bookings(id) ON DELETE CASCADE,

                         CONSTRAINT fk_tickets_seat FOREIGN KEY (seat_id)
                             REFERENCES seats(id),

                         CONSTRAINT fk_tickets_showtime FOREIGN KEY (showtime_id)
                             REFERENCES showtimes(id),

                         CONSTRAINT uq_ticket_seat_showtime UNIQUE (seat_id, showtime_id)
);

-- =====================================================
-- 9. INDEX TỐI ƯU
-- =====================================================
CREATE INDEX idx_movies_title ON movies(title);
CREATE INDEX idx_showtimes_start_time ON showtimes(start_time);
CREATE INDEX idx_showtimes_movie ON showtimes(movie_id);
CREATE INDEX idx_showtimes_room ON showtimes(room_id);
CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_transaction ON bookings(transaction_id);
CREATE INDEX idx_tickets_booking ON tickets(booking_id);
CREATE INDEX idx_tickets_showtime ON tickets(showtime_id);