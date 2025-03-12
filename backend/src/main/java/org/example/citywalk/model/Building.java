package org.example.citywalk.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Entity
@Table(name = "cwBuildings")
public class Building {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "building_id", nullable = false)
    private Long id;

    @Column(name = "building_name")
    private String name;

    @Column(name = "building_description")
    private String description;

    @Column(name = "building_address")
    private String address;

    @Column(name = "building_constructionYear")
    private String constructionYear;

    @Column(name = "building_architect")
    private String architect;

    @Column(name = "building_type")
    private String type;

    @Column(name = "building_latitude")
    private Double latitude;

    @Column(name = "building_longitude")
    private Double longitude;

    @ManyToOne
    @JoinColumn(name = "city_id")
    @JsonBackReference
    private City city;

    @ManyToMany
    @JoinTable(
            name = "building_architectural",
            joinColumns = @JoinColumn(name = "building_id"),
            inverseJoinColumns = @JoinColumn(name = "architectural_id")
    )
    private List<Architectural> architecturals = new ArrayList<>();

    @Column(name = "buidling_created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "buidling_updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Building() {
    }

    public Building(String name, Double latitude, Double longitude, City city) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.city = city;
    }

    public Building(String name, String description, Double latitude, Double longitude) {
        this.name = name;
        this.description = description;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Building(Double longitude, Double latitude, String type, String name, String address) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.type = type;
        this.name = name;
        this.address = address;
    }

    public Building(String name, String address, Double latitude, Double longitude, String type, String description, String constructionYear, String architect) {
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.type = type;
        this.description = description;
        this.constructionYear = constructionYear;
        this.architect = architect;
    }

    public Building(String name, String address, String constructionYear, String architect, String description, City city, String type, List<Architectural> architecturals, Double latitude, Double longitude) {
        this.name = name;
        this.address = address;
        this.constructionYear = constructionYear;
        this.architect = architect;
        this.description = description;
        this.city = city;
        this.type = type;
        this.architecturals = architecturals;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getConstructionYear() {
        return constructionYear;
    }

    public void setConstructionYear(String constructionYear) {
        this.constructionYear = constructionYear;
    }

    public String getArchitect() {
        return architect;
    }

    public void setArchitect(String architect) {
        this.architect = architect;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Architectural> getArchitecturals() {
        return architecturals;
    }

    public void setArchitecturals(List<Architectural> architecturals) {
        this.architecturals = architecturals;
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

    @Override
    public String toString() {
        return new StringJoiner(", ", Building.class.getSimpleName() + "[", "]")
                .add("name='" + name + "'")
                .add("description='" + description + "'")
                .add("address='" + address + "'")
                .add("constructionYear='" + constructionYear + "'")
                .add("architect='" + architect + "'")
                .add("type='" + type + "'")
                .add("latitude=" + latitude)
                .add("longitude=" + longitude)
                .add("city=" + city.getName())
                .toString();
    }
}
