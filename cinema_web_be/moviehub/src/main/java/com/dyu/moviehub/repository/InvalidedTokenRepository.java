package com.dyu.moviehub.repository;

import com.dyu.moviehub.entity.InvalidatedToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvalidedTokenRepository extends JpaRepository<InvalidatedToken, String> {

}
