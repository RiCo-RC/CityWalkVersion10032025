package org.example.citywalk.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;

@Entity
@Table(name = "cwUsers")
public class User {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "user_id", nullable = false)
  private Long id;

  @Column(name = "user_first_name", nullable = false)
  private String firstName;

  @Column(name = "user_last_name", nullable = false)
  private String lastName;

  @Column(name = "user_username", nullable = false)
  private String username;

  @Column(name = "user_email", nullable = false)
  private String email;

  @Column(name = "user_password", nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(name = "user_role", nullable = false)
  private ERoleUser role = ERoleUser.valueOf("visitor".toUpperCase());

  @Column(name = "user_online", nullable = false)
  private boolean isOnline;

  @Column(name = "user_token", nullable = true)
  private String token;

  @OneToOne
  //@Column(name = "user_favoris_list")
  @JoinTable(name = "favoris_list_id")
  private Favoris favorisList;

  @OneToMany
  @Column(name = "user_travel_list")
  private List<TravelList> travelList = new ArrayList<TravelList>();

  @Column(name = "user_created_at", nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column(name = "user_updated_at", nullable = false)
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

  public User() {}

  public User(String username, String role) {
    this.username = username;
    this.role = ERoleUser.valueOf(role.toUpperCase());
  }

  public User(String username, String password, String role) {
    this.username = username;
    this.password = password;
    this.role = ERoleUser.valueOf(role.toUpperCase());
  }

  public User(String firstName, String lastName, String username, String email, String password, String token) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  public User(String firstName, String lastName, String username, String email, String password, String role, boolean isOnline) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = ERoleUser.valueOf(role.toUpperCase());
    this.isOnline = isOnline;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public ERoleUser getRole() {
    return role;
  }

  public void setRole(ERoleUser role) {
    this.role = role;
  }

  public boolean isOnline() {
    return isOnline;
  }

  public void setOnline(boolean online) {
    isOnline = online;
  }

  public String getToken() {
    return token;
  }

  public void setToken(String token) {
    this.token = token;
  }

  public Favoris getFavorisList() {
    return favorisList;
  }

  public void setFavorisList(Favoris favorisList) {
    this.favorisList = favorisList;
  }

  public List<TravelList> getTravelList() {
    return travelList;
  }

  public void setTravelList(List<TravelList> travelList) {
    this.travelList = travelList;
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
    return new StringJoiner(", ", User.class.getSimpleName() + "[", "]")
      .add("firstName='" + firstName + "'")
      .add("lastName='" + lastName + "'")
      .add("username='" + username + "'")
      .add("email='" + email + "'")
      .add("password='" + password + "'")
      .add("role=" + role.toString().toLowerCase())
      .add("isOnline=" + isOnline)
      .add("token='" + token + "'")
      .add("favorisList=" + favorisList)
      .toString();
  }
}
