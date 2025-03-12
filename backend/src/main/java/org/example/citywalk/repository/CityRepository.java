package org.example.citywalk.repository;

import org.example.citywalk.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    Optional<City> findOneByName(String name);

    @Query("SELECT c FROM City c LEFT JOIN FETCH c.buildings WHERE c.name = :name")
    Optional<City> findByNameWithBuildings(@Param("name") String name);

    List<City> findByName(String name);

}
