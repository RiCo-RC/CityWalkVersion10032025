package org.example.citywalk.model;

import jakarta.persistence.*;

@Entity
@Table(name = "cwArchitecturals")
public class Architectural {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "architectural_id", nullable = false)
    private Long id;

    @Column(name = "architectural_name")
    private String name;

    @Column(name = "architectural_description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "building_id")
    private Building building;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
}
