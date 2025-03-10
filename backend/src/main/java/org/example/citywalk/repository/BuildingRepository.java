package org.example.citywalk.repository;

import org.example.citywalk.model.Building;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {
  List<Building> findAllByCityId(Long id);
  Optional<Building> findByName(String name);

  Building findBuildingByName(String name);

}

