package org.example.citywalk.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Entity
@Table(name = "cwFavoris")
public class Favoris {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "favoris_id", nullable = false)
    private Long id;

    @Column(name = "favoris_name")
    private String name;

    @Column(name = "favoris_type")
    private String type;

    @Column(name = "favoris_created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "favoris_updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToMany
    @JoinTable(
            name = "favoris_buildings",
            joinColumns = @JoinColumn(name = "building_id"),
            inverseJoinColumns = @JoinColumn(name = "favoris_id")
    )
    private List<Building> buildings = new ArrayList<>();

    public Favoris() {
    }

    public Favoris(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public List<Building> getBuildings() {
        return buildings;
    }

    public void setBuildings(List<Building> buildings) {
        this.buildings = buildings;
    }

    public void addBuilding(Building building) {
        this.buildings.add(building);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Favoris.class.getSimpleName() + "[", "]")
                .add("name='" + name + "'")
                .add("type='" + type + "'")
                .toString();
    }
}
