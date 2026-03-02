CREATE EXTENSION IF NOT EXISTS btree_gist;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$ language 'plpgsql';

-- 1. USERS
CREATE TABLE users (
                       id BIGSERIAL PRIMARY KEY,
                       full_name VARCHAR(100) NOT NULL,
                       email VARCHAR(255) NOT NULL UNIQUE,
                       password VARCHAR(255) NOT NULL,
                       avatar_url TEXT,
                       avatar_public_id VARCHAR(255),
                       phone VARCHAR(20),
                       role VARCHAR(20) NOT NULL DEFAULT 'CUSTOMER',
                       loyalty_points INT DEFAULT 0 CHECK (loyalty_points >= 0),
                       created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       CONSTRAINT chk_users_role CHECK (role IN ('CUSTOMER', 'ADMIN', 'STAFF'))
);
CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 2. DIRECTORS, ACTORS, STUDIOS
CREATE TABLE directors (
                           id BIGSERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           image_url TEXT,
                           image_public_id VARCHAR(255),
                           description TEXT,
                           created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE actors (
                        id BIGSERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        image_url TEXT,
                        image_public_id VARCHAR(255),
                        description TEXT,
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studios (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         logo_url TEXT,
                         logo_public_id VARCHAR(255),
                         country VARCHAR(100),
                         created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. MOVIES (Đã đổi sang TIMESTAMPTZ)
CREATE TABLE movies (
                        id BIGSERIAL PRIMARY KEY,
                        title VARCHAR(255) NOT NULL,
                        synopsis TEXT,
                        genre VARCHAR(100)[],
                        poster_url TEXT,
                        poster_public_id VARCHAR(255),
                        hero_image_url TEXT,
                        hero_image_public_id VARCHAR(255),
                        trailer_url TEXT,
                        language VARCHAR(50) DEFAULT 'English (EN)',
                        rated VARCHAR(10),
                        duration_minutes INT NOT NULL CHECK (duration_minutes > 0),
                        release_date DATE NOT NULL,
                        budget DECIMAL(15,2) DEFAULT 0,
                        revenue DECIMAL(15,2) DEFAULT 0,
                        avg_rating DECIMAL(3,1) DEFAULT 0.0,
                        total_reviews INT DEFAULT 0,
                        status VARCHAR(20) NOT NULL DEFAULT 'SHOWING',
                        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                        CONSTRAINT chk_movies_status CHECK (status IN ('COMING_SOON', 'SHOWING', 'STOPPED'))
);
CREATE TRIGGER trg_movies_updated_at BEFORE UPDATE ON movies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE movie_directors (
                                 movie_id BIGINT REFERENCES movies(id) ON DELETE CASCADE,
                                 director_id BIGINT REFERENCES directors(id) ON DELETE CASCADE,
                                 PRIMARY KEY (movie_id, director_id)
);
CREATE TABLE movie_actors (
                              movie_id BIGINT REFERENCES movies(id) ON DELETE CASCADE,
                              actor_id BIGINT REFERENCES actors(id) ON DELETE CASCADE,
                              character_name VARCHAR(255),
                              PRIMARY KEY (movie_id, actor_id)
);
CREATE TABLE movie_studios (
                               movie_id BIGINT REFERENCES movies(id) ON DELETE CASCADE,
                               studio_id BIGINT REFERENCES studios(id) ON DELETE CASCADE,
                               PRIMARY KEY (movie_id, studio_id)
);

-- 4. CINEMAS, ROOMS, SEATS
CREATE TABLE cinemas (
                         id BIGSERIAL PRIMARY KEY,
                         name VARCHAR(100) NOT NULL,
                         address TEXT NOT NULL,
                         city VARCHAR(50) NOT NULL,
                         hotline VARCHAR(20),
                         status BOOLEAN NOT NULL DEFAULT TRUE,
                         created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
                       id BIGSERIAL PRIMARY KEY,
                       cinema_id BIGINT NOT NULL REFERENCES cinemas(id) ON DELETE CASCADE,
                       name VARCHAR(50) NOT NULL,
                       type VARCHAR(20) NOT NULL DEFAULT 'STANDARD',
                       total_seats INT NOT NULL DEFAULT 0,
                       total_rows INT NOT NULL DEFAULT 10,
                       total_columns INT NOT NULL DEFAULT 12,
                       status BOOLEAN NOT NULL DEFAULT TRUE,
                       CONSTRAINT uq_room_name UNIQUE (cinema_id, name)
);

CREATE TABLE seats (
                       id BIGSERIAL PRIMARY KEY,
                       room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                       row_name VARCHAR(5) NOT NULL,
                       seat_number INT NOT NULL,
                       type VARCHAR(20) NOT NULL DEFAULT 'NORMAL',
                       extra_price DECIMAL(10,2) DEFAULT 0,
                       status BOOLEAN NOT NULL DEFAULT TRUE,
                       CONSTRAINT chk_seats_type CHECK (type IN ('NORMAL', 'VIP', 'COUPLE')),
                       CONSTRAINT uq_seat_position UNIQUE (room_id, row_name, seat_number)
);

-- 5. SHOWTIMES
CREATE TABLE showtimes (
                           id BIGSERIAL PRIMARY KEY,
                           movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
                           room_id BIGINT NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
                           format VARCHAR(20) NOT NULL DEFAULT '2D',
                           start_time TIMESTAMPTZ NOT NULL,
                           end_time TIMESTAMPTZ NOT NULL,
                           base_price DECIMAL(10,2) NOT NULL,
                           status BOOLEAN NOT NULL DEFAULT TRUE,
                           created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           CONSTRAINT chk_showtime_time CHECK (end_time > start_time),
                           CONSTRAINT no_overlapping_showtimes EXCLUDE USING gist (room_id WITH =, tsrange(start_time, end_time) WITH &&)
);

-- 6. SNACKS
CREATE TABLE snacks (
                        id BIGSERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
                        image_url TEXT,
                        image_public_id VARCHAR(255),
                        category VARCHAR(50),
                        tag VARCHAR(20),
                        stock_quantity INT DEFAULT 0,
                        status BOOLEAN DEFAULT TRUE,
                        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_snacks_updated_at BEFORE UPDATE ON snacks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 7. BOOKINGS
CREATE TABLE bookings (
                          id BIGSERIAL PRIMARY KEY,
                          booking_display_id VARCHAR(20) UNIQUE,
                          user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          showtime_id BIGINT NOT NULL REFERENCES showtimes(id) ON DELETE CASCADE,
                          subtotal DECIMAL(10,2) DEFAULT 0,
                          booking_fee DECIMAL(10,2) DEFAULT 2.50,
                          service_tax_amount DECIMAL(10,2) DEFAULT 0,
                          total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
                          payment_method VARCHAR(50),
                          status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
                          booking_time TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                          CONSTRAINT chk_bookings_status CHECK (status IN ('PENDING', 'SUCCESS', 'CANCELLED', 'EXPIRED', 'WATCHED'))
);

-- 8. TICKETS & SNACKS
CREATE TABLE tickets (
                         id BIGSERIAL PRIMARY KEY,
                         booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
                         seat_id BIGINT NOT NULL REFERENCES seats(id),
                         showtime_id BIGINT NOT NULL REFERENCES showtimes(id),
                         price DECIMAL(10,2) NOT NULL,
                         ticket_code VARCHAR(50) UNIQUE,
                         CONSTRAINT uq_seat_per_showtime UNIQUE (seat_id, showtime_id)
);

CREATE TABLE booking_snacks (
                                booking_id BIGINT REFERENCES bookings(id) ON DELETE CASCADE,
                                snack_id BIGINT REFERENCES snacks(id),
                                quantity INT NOT NULL CHECK (quantity > 0),
                                price_at_booking DECIMAL(10,2) NOT NULL,
                                PRIMARY KEY (booking_id, snack_id)
);

-- 9. PAYMENTS
CREATE TABLE payments (
                          id BIGSERIAL PRIMARY KEY,
                          booking_id BIGINT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
                          transaction_id VARCHAR(255),
                          method VARCHAR(50),
                          amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
                          currency VARCHAR(10) DEFAULT 'USD',
                          status VARCHAR(20) DEFAULT 'PENDING',
                          provider_response JSONB,
                          error_message TEXT,
                          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TRIGGER trg_payments_updated_at BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. REVIEWS
CREATE TABLE reviews (
                         id BIGSERIAL PRIMARY KEY,
                         user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         movie_id BIGINT NOT NULL REFERENCES movies(id) ON DELETE CASCADE,
                         booking_id BIGINT REFERENCES bookings(id),
                         rating_stars INT NOT NULL CHECK (rating_stars BETWEEN 1 AND 5),
                         highlight_tags VARCHAR(50)[] DEFAULT '{}',
                         comment TEXT,
                         helpful_count INT DEFAULT 0,
                         status VARCHAR(20) DEFAULT 'VISIBLE',
                         created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                         updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                         CONSTRAINT uq_user_movie_review UNIQUE (user_id, movie_id)
);
CREATE TRIGGER trg_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- INDEX VÀ TRIGGER ĐÁNH GIÁ PHIM
CREATE INDEX idx_reviews_movie_helpful ON reviews(movie_id, helpful_count DESC);
CREATE INDEX idx_reviews_movie_recent ON reviews(movie_id, created_at DESC);

CREATE OR REPLACE FUNCTION update_movie_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
UPDATE movies
SET
    avg_rating = (SELECT COALESCE(AVG(rating_stars), 0.0) FROM reviews WHERE movie_id = COALESCE(NEW.movie_id, OLD.movie_id)),
    total_reviews = (SELECT COUNT(*) FROM reviews WHERE movie_id = COALESCE(NEW.movie_id, OLD.movie_id))
WHERE id = COALESCE(NEW.movie_id, OLD.movie_id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_after_review_changes
    AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_movie_rating_stats();