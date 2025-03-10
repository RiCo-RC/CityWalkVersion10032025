package org.example.citywalk.service;

import org.example.citywalk.model.City;
import org.example.citywalk.model.ERoleUser;
import org.example.citywalk.model.User;
import org.example.citywalk.repository.UserRepository;
import org.example.citywalk.utils.Debug;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final Debug console = new Debug();
  private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  //---- BASE ----\\

  public Map<String, Object> getAllUsers() {
    console.log("----- START | UserService : getAll -----");
    Map<String, Object> response = new HashMap<>();
    List<User> users = userRepository.findAll();
    if (users.isEmpty()) {
      response.put("message", "No users found");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("users", users);
    console.log("----- END | UserService : getAll -----");
    return response;
  }

  public Map<String, Object> createUser(User user) {
    console.log("----- START | UserService : create -----");
    console.log("Args: user=" + user);
    Map<String, Object> response = new HashMap<>();
    User existingUser = userRepository.findById(user.getId()).orElse(null);
    if (existingUser != null) {
      response.put("message", "User already exists");
      return response;
    };
    User createdUser = new User();
    createdUser.setFirstName(user.getFirstName());
    createdUser.setLastName(user.getLastName());
    createdUser.setUsername(user.getUsername());
    createdUser.setEmail(user.getEmail());
    createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
    createdUser.setRole(ERoleUser.VISITOR);
    userRepository.save(createdUser);
    response.put("message", "User created successfully");
    response.put("user", createdUser);
    console.log("----- END | UserService : create -----");
    return response;
  }

  public Map<String, Object> updateUser(User user) {
    console.log("----- START | UserService : update -----");
    console.log("Args: user=" + user);
    Map<String, Object> response = new HashMap<>();
    User updatedUser = userRepository.findById(user.getId()).orElse(null);
    if (updatedUser == null) {
      response.put("message", "User not found");
      return response;
    };
    updatedUser.setFirstName(user.getFirstName());
    updatedUser.setLastName(user.getLastName());
    updatedUser.setUsername(user.getUsername());
    updatedUser.setEmail(user.getEmail());
    updatedUser.setPassword(passwordEncoder.encode(user.getPassword()));
    updatedUser.setRole(user.getRole());
    userRepository.save(updatedUser);
    response.put("message", "User updated successfully");
    response.put("user", updatedUser);
    console.log("----- END | UserService : update -----");
    return response;
  }

  public Map<String, Object> deleteUser(Long id) {
    console.log("----- START | UserService : delete -----");
    console.log("Args: id=" + id);
    Map<String, Object> response = new HashMap<>();
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
      response.put("message", "User not found");
      return response;
    }
    userRepository.delete(user);
    response.put("message", "User deleted successfully");
    console.log("----- END | UserService : delete -----");
    return response;
  }

  //---- GET ----\\

  public Map<String, Object> getOneUserById(Long id) {
    console.log("----- START | UserService : getOneById -----");
    console.log("Args: user id=" + id);
    Map<String, Object> response = new HashMap<>();
    User user = userRepository.findById(id).orElse(null);
    if (user == null) {
      response.put("message", "User not found");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("user", user);
    console.log("----- END | UserService : getOneById -----");
    return response;
  }

  public Map<String, Object> getOneUserByUsername(String username) {
    console.log("----- START | UserService : getOneUserByUsername -----");
    console.log("Args: user username=" + username);
    Map<String, Object> response = new HashMap<>();
    User user = userRepository.findOneUserByUsername(username).orElse(null);
    if (user == null) {
      response.put("message", "No users found for this username");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("user", user);
    console.log("----- END | UserService : getOneById -----");
    return response;
  }

  //---- AUTHENTICATE ----\\

  public Map<String, Object> registerUser(User user) {
    console.log("----- START | UserService : registerUser -----");
    console.log("Args: user=" + user);
    Map<String, Object> response = this.createUser(user);
    console.log("----- END | UserService : register -----");
    return response;
  }

  public Map<String, Object> loginUser(User user) {
    console.log("----- START | UserService : loginUser -----");
    console.log("Args: user=" + user);
    Map<String, Object> response = new HashMap<>();
    Optional<User> existingUser = userRepository.findOneUserByUsername(user.getUsername());
    if (existingUser.isEmpty() || !passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
      response.put("message", "No matching user");
      return response;
    }
    response.put("message", "Login successful");
    response.put("user", existingUser);
    console.log("----- END | UserService : loginUser -----");
    return response;
  }

  public Map<String, Object> guestLoginUser() {
    console.log("----- START | UserService : guestLoginUser -----");
    Map<String, Object> response = new HashMap<>();
    User guest = new User("Guest", "non_connected");
    response.put("message", "Login successful");
    response.put("user", guest);
    console.log("----- END | UserService : guestLoginUser -----");
    return response;
  }

}
