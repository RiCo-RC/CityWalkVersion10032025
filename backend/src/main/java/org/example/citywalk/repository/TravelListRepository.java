package org.example.citywalk.repository;

import org.example.citywalk.model.TravelList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TravelListRepository extends JpaRepository<TravelList, Long> {
}