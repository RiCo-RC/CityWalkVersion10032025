package org.example.citywalk.controller;

import org.example.citywalk.model.City;
import org.example.citywalk.service.CityService;
import org.example.citywalk.utils.Debug;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class CityController {

  private final CityService cityService;
  private final Debug console = new Debug();

  public CityController(CityService cityService) {
    this.cityService = cityService;
  }

  //---- BASE ----\\

  @GetMapping("/cities")
  public ResponseEntity<Map<String, Object>> getAllCities() {
    Map<String, Object> response = cityService.getAllCities();
    return ResponseEntity.ok(response);
  }

  @PostMapping("/city/create")
  public ResponseEntity<Map<String, Object>> createCity(@RequestBody City city) {
    Map<String, Object> response = cityService.createCity(city);
    return ResponseEntity.ok(response);
  }

  @PutMapping("/city/update")
  public ResponseEntity<Map<String, Object>> updateCity(
    @RequestBody City city
  ) {
    Map<String, Object> response = cityService.updateCity(city);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/city/delete/id/{id}")
  public ResponseEntity<Map<String, Object>> deleteCity(@PathVariable Long id) {
    Map<String, Object> response = cityService.deleteCity(id);
    return ResponseEntity.ok(response);
  }

  //---- GET ----\\

  @GetMapping("/city/get/id/{id}")
  public ResponseEntity<Map<String, Object>> getOneCityById(@PathVariable Long id) {
    Map<String, Object> city = cityService.getOneCityById(id);
    return ResponseEntity.ok(city);
  }

  @GetMapping("/city/get/name/{name}")
  public ResponseEntity<Map<String, Object>> getOneCityByName(@PathVariable String name) {
    Map<String, Object> city = cityService.getOneCityByName(name);
    return ResponseEntity.ok(city);
  }
}
