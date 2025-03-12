package org.example.citywalk.repository;

import org.example.citywalk.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findAllByBuildingId(Long id);
    //List<Building> findByBuildingId(Long buildingId);
}

