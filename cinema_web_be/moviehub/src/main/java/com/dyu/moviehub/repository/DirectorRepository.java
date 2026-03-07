package com.dyu.moviehub.repository;

import com.dyu.moviehub.dto.response.TMDBCreditsResponse;
import com.dyu.moviehub.entity.Director;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.function.Function;

@Repository
public interface DirectorRepository extends JpaRepository<Director, Long> {

    Optional<Director> findByName(String name);
}
