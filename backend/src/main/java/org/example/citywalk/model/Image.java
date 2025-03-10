package org.example.citywalk.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.StringJoiner;

@Entity
@Table(name = "cwImages")
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "image_id", nullable = false)
  private Long id;

  @Column(name = "image_name")
  private String name;

  @Column(name = "image_type")
  private String type;

  @Column(name = "image_url")
  private String url;

  @ManyToOne
  @JoinColumn(name = "building_id")
  private Building building;

  public Image() {}

  public Image(String name, String type) {
    this.name = name;
    this.type = type;
  }

  public Image(String name, String type, String url) {
    this.name = name;
    this.type = type;
    this.url = url;
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

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Building getBuilding() {
    return building;
  }

  public void setBuilding(Building building) {
    this.building = building;
  }

  @Override
  public String toString() {
    return new StringJoiner(", ", Image.class.getSimpleName() + "[", "]")
      .add("name='" + name + "'")
      .add("type='" + type + "'")
      .add("url='" + url + "'")
      .toString();
  }
}