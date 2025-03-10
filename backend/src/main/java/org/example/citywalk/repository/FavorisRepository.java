package org.example.citywalk.repository;

import org.example.citywalk.model.Favoris;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavorisRepository extends JpaRepository<Favoris, Long> {
}