package org.example.citywalk.repository;

import org.example.citywalk.model.Architectural;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArchitecturalRepository extends JpaRepository<Architectural, Long> {
    List<Architectural> findAllByBuildingId(Long id);
    //List findByBuildingId(Long buildingId);
}
