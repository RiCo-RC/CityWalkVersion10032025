package org.example.citywalk.controller;

import org.example.citywalk.model.User;
import org.example.citywalk.service.UserService;
import org.example.citywalk.utils.Debug;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {

  private final UserService userService;
  private final Debug console = new Debug();

  public UserController(UserService userService) {
    this.userService = userService;
  }

  //---- BASE ----\\

  @GetMapping("/users")
  public ResponseEntity<Map<String, Object>> getAllUsers() {
    Map<String, Object> response = userService.getAllUsers();
    return ResponseEntity.ok(response);
  }

  @PostMapping("/user/create")
  public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
    Map<String, Object> response = userService.createUser(user);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/user/update")
  public ResponseEntity<Map<String, Object>> updateUser(@RequestBody User user) {
    Map<String, Object> response = userService.updateUser(user);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/user/delete/id/{id}")
  public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable Long id) {
    Map<String, Object> response = userService.deleteUser(id);
    return ResponseEntity.ok(response);
  }

  //---- GET ----\\

  @GetMapping("/user/get/id/{id}")
  public ResponseEntity<Map<String, Object>> getOneUserById(@PathVariable Long id) {
    Map<String, Object> response = userService.getOneUserById(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping("/user/get/username/{username}")
  public ResponseEntity<Map<String, Object>> getOneUserByUsername(@PathVariable String username) {
    Map<String, Object> response = userService.getOneUserByUsername(username);
    return ResponseEntity.ok(response);
  }

  //---- AUTHENTICATE ----\\

  @PostMapping("/user/register")
  public ResponseEntity<Map<String, Object>> registerUser(@RequestBody User user) {
    Map<String, Object> response = userService.registerUser(user);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/user/login")
  public ResponseEntity<Map<String, Object>> loginUser(@RequestBody User user) {
    Map<String, Object> response = userService.loginUser(user);
    return ResponseEntity.ok(response);
  }

  @PostMapping("/user/guest-login")
  public ResponseEntity<Map<String, Object>> guestLoginUser() {
    Map<String, Object> response = userService.guestLoginUser();
    return ResponseEntity.ok(response);
  }
}
