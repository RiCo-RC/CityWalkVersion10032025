package org.example.citywalk.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Entity
@Table(name = "cwCities")
public class City {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "city_id", nullable = false)
  private Long id;

  @Column(name = "city_name")
  private String name;

  @Column(name = "city_description")
  private String description;

  @Column(name = "city_latitude")
  private Double latitude;

  @Column(name = "city_longitude")
  private Double longitude;

  @Column(name = "city_latitude_delta")
  private Double latitudeDelta;

  @Column(name = "city_longitutde_delta")
  private Double longitudeDelta;

  @Column(name = "city_country")
  private String country;

  @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Building> buildings = new ArrayList<>();;

  @Column(name = "city_created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "city_updated_at", nullable = false)
  private LocalDateTime updatedAt;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    updatedAt = LocalDateTime.now();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = LocalDateTime.now();
  }

  public City() {};

  public City(String name) {
    this.name = name;
  }

  public City(String name, Double latitude, Double longitude, Double latitudeDelta, Double longitudeDelta) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.latitudeDelta = latitudeDelta;
    this.longitudeDelta = longitudeDelta;
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

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public List<Building> getBuildings() {
    return buildings;
  }

  public void setBuildings(List<Building> buildings) {
    this.buildings = buildings;
  }

  public Double getLatitudeDelta() {
    return latitudeDelta;
  }

  public void setLatitudeDelta(Double latitudeDelta) {
    this.latitudeDelta = latitudeDelta;
  }

  public Double getLongitudeDelta() {
    return longitudeDelta;
  }

  public void setLongitudeDelta(Double longitudeDelta) {
    this.longitudeDelta = longitudeDelta;
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

  public void addBuilding(Building building) {
    this.buildings.add(building);
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", City.class.getSimpleName() + "[", "]")
      .add("name='" + name + "'")
      .add("description='" + description + "'")
      .add("latitude=" + latitude)
      .add("longitude=" + longitude)
      .add("country='" + country + "'")
      .toString();
  }
}
