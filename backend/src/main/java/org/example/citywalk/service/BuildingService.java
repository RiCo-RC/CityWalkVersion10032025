package org.example.citywalk.service;

import org.example.citywalk.model.Building;
import org.example.citywalk.repository.BuildingRepository;
import org.example.citywalk.repository.CityRepository;
import org.example.citywalk.utils.Debug;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BuildingService {

    private final BuildingRepository buildingRepository;
    private final Debug console = new Debug();
    private final CityRepository cityRepository;

    public BuildingService(BuildingRepository buildingRepository, CityRepository cityRepository) {
        this.buildingRepository = buildingRepository;
        this.cityRepository = cityRepository;
    }

    //---- BASE ----\

    public Map<String, Object> getAllBuildings() {
        console.log("----- START | BuildingService : getAll -----");
        Map<String, Object> response = new HashMap<>();
        List<Building> buildings = buildingRepository.findAll();
        if (buildings.isEmpty()) {
            response.put("message", "No buildings found");
            return response;
        }

        response.put("message", "Request was successful");
        response.put("users", buildings);
        console.log("----- END | BuildingService : getAll -----");
        return response;
    }

    public Map<String, Object> createBuilding(Building building) {
        console.log("----- START | BuildingService : create -----");
        console.log("Args: building=" + building);
        Map<String, Object> response = new HashMap<>();
        Building existingBuilding = buildingRepository.findByName(building.getName()).orElse(null);
        if (existingBuilding != null) {
            response.put("message", "Building already exists");
            return response;
        }

        Building createdBuilding = new Building();
        createdBuilding.setName(building.getName());
        createdBuilding.setDescription(building.getDescription());
        createdBuilding.setLatitude(building.getLatitude());
        createdBuilding.setLongitude(building.getLongitude());

        if (building.getCity().getName() != null) {
            cityRepository.findOneByName(building.getCity().getName()).ifPresent(createdBuilding::setCity);
        }
        buildingRepository.save(createdBuilding);
        response.put("message", "Building created successfully");
        response.put("user", createdBuilding);
        console.log("----- END | BuildingService : create -----");
        return response;
    }

    public Map<String, Object> updateBuilding(Building building) {
        console.log("----- START | BuildingService : update -----");
        console.log("Args: building=" + building);
        Map<String, Object> response = new HashMap<>();
        Building updatedBuilding = buildingRepository.findById(building.getId()).orElse(null);
        if (updatedBuilding == null) {
            response.put("message", "Building not found");
            return response;
        }
        updatedBuilding.setName(building.getName());
        updatedBuilding.setDescription(building.getDescription());
        updatedBuilding.setLatitude(building.getLatitude());
        updatedBuilding.setLongitude(building.getLongitude());
        buildingRepository.save(updatedBuilding);
        response.put("message", "Building updated successfully");
        response.put("user", updatedBuilding);
        console.log("----- END | BuildingService : update -----");
        return response;
    }

    public Map<String, Object> deleteBuilding(Long id) {
        console.log("----- START | BuildingService : delete -----");
        console.log("Args: id=" + id);
        Map<String, Object> response = new HashMap<>();
        Building building = buildingRepository.findById(id).orElse(null);
        if (building == null) {
            response.put("message", "Building not found");
            return response;
        }
        buildingRepository.delete(building);
        response.put("message", "Building deleted successfully");
        console.log("----- END | BuildingService : delete -----");
        return response;
    }

    //---- GET ----\

    public Map<String, Object> getBuildingById(Long id) {
        console.log("----- START | BuildingService : getOneById -----");
        console.log("Args: id=" + id);
        Map<String, Object> response = new HashMap<>();
        Building building = buildingRepository.findById(id).orElse(null);
        if (building == null) {
            response.put("message", "Building not found");
            return response;
        }

        response.put("message", "Request was successful");
        response.put("building", building);
        console.log("----- END | getBuildingById : getOneById -----");
        return response;
    }

    public Map<String, Object> getBuildingsByCityId(Long id) {
        console.log("----- START | BuildingService : getBuildingsByCityId -----");
        console.log("Args: building id=" + id);
        Map<String, Object> response = new HashMap<>();
        List<Building> buildings = buildingRepository.findAllByCityId(id);
        if (buildings.isEmpty()) {
            response.put("message", "No buildings found for this city");
            return response;
        }

        response.put("message", "Request was successful");
        response.put("buildings", buildings);
        console.log("----- END | BuildingService : getBuildingsByCityId -----");
        return response;
    }
}
