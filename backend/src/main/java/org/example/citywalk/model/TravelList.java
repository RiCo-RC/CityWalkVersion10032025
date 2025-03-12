package org.example.citywalk.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cwTravelList")
public class TravelList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_list_id", nullable = false)
    private Long id;

    @Column(name = "travel_list_name")
    private String name;

    @Column(name = "travel_list_type")
    private String type;

    @Column(name = "travel_list_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "travel_list_updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "travel_list_buildings",
            joinColumns = @JoinColumn(name = "travel_list_id"),
            inverseJoinColumns = @JoinColumn(name = "building_id")
    )
    private List<Building> buildings = new ArrayList<>();
}

