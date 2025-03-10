package org.example.citywalk.service;

import org.example.citywalk.model.City;
import org.example.citywalk.model.User;
import org.example.citywalk.repository.CityRepository;
import org.example.citywalk.utils.Debug;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CityService {

  private final CityRepository cityRepository;
  private final Debug console = new Debug();

  public CityService(CityRepository cityRepository) {
    this.cityRepository = cityRepository;
  }

  //---- BASE ----\\

  public Map<String, Object> getAllCities() {
    console.log("----- START | CityService : getAll -----");
    Map<String, Object> response = new HashMap<>();
    List<City> cities = cityRepository.findAll();
    if (cities.isEmpty()) {
      response.put("message", "No cities found");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("cityList", cities);
    console.log("----- END | CityService : getAll -----");
    return response;
  };

  public Map<String, Object> createCity(City city) {
    console.log("----- START | CityService : create -----");
    console.log("Args: city=" + city);
    Map<String, Object> response = new HashMap<>();
    City existingCity = cityRepository.findOneByName(city.getName()).orElse(null);
    if (!(existingCity == null)) {
      response.put("message", "City already exists");
      return response;
    };
    City createdCity = new City();
    createdCity.setName(city.getName());
    createdCity.setLatitude(city.getLatitude());
    createdCity.setLongitude(city.getLongitude());
    createdCity.setLatitudeDelta(city.getLatitudeDelta());
    createdCity.setLongitudeDelta(city.getLongitudeDelta());
    cityRepository.save(createdCity);
    response.put("message", "City created successfully");
    response.put("city", createdCity);
    console.log("----- END | CityService : create -----");
    return response;
  };

  public Map<String, Object> updateCity(City city) {
    console.log("----- START | CityService : update -----");
    console.log("Args: city=" + city);
    Map<String, Object> response = new HashMap<>();
    City updatedCity = cityRepository.findById(city.getId()).orElse(null);
    if (updatedCity == null) {
      response.put("message", "City not found");
      return response;
    };
    response.put("message", "City updated successfully");
    updatedCity.setName(city.getName());
    updatedCity.setLatitude(city.getLatitude());
    updatedCity.setLongitude(city.getLongitude());
    updatedCity.setLatitudeDelta(city.getLatitudeDelta());
    updatedCity.setLongitudeDelta(city.getLongitudeDelta());
    console.log("Args: updatedCity=" + updatedCity);
    cityRepository.save(updatedCity);
    console.log("----- END | CityService : update -----");
    return response;
  };

  public Map<String, Object> deleteCity(Long id) {
    console.log("----- START | CityService : delete -----");
    console.log("Args: id=" + id);
    Map<String, Object> response = new HashMap<>();
    City deletedCity = cityRepository.findById(id).orElse(null);
    if (deletedCity == null) {
      response.put("message", "City not found");
      return response;
    }
    response.put("message", "City deleted successfully");
    cityRepository.delete(deletedCity);
    console.log("----- END | CityService : delete -----");
    return response;
  };

  //---- GET ----\\

  public Map<String, Object> getOneCityById(Long id) {
    console.log("----- START | CityService : getOneById -----");
    console.log("Args: city id=" + id);
    Map<String, Object> response = new HashMap<>();
    City city = cityRepository.findById(id).orElse(null);
    if (city == null) {
      response.put("message", "City don't exists");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("city", city);
    console.log("----- END | CityService : createCity -----");
    return response;
  };

  public Map<String, Object> getOneCityByName(String name) {
    console.log("----- START | CityService : getOneByName -----");
    console.log("Args: city name=" + name);
    Map<String, Object> response = new HashMap<>();
    City city = cityRepository.findOneByName(name).orElse(null);
    if (city == null) {
      response.put("message", "City don't exists");
      return response;
    };
    response.put("message", "Request was successful");
    response.put("city", city);
    console.log("----- END | CityService : getOneByName -----");
    return response;
  };
}