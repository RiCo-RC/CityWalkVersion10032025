package org.example.citywalk.controller;

import org.example.citywalk.model.Building;
import org.example.citywalk.service.BuildingService;
import org.example.citywalk.utils.Debug;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class BuildingController {

    private final BuildingService buildingService;
    private final Debug console = new Debug();

    public BuildingController(BuildingService buildingService) {
        this.buildingService = buildingService;
    }

    //---- BASE ----\\

    @GetMapping("/buildings")
    public ResponseEntity<Map<String, Object>> getAllBuildings() {
        Map<String, Object> response = buildingService.getAllBuildings();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/building/create")
    public ResponseEntity<Map<String, Object>> createBuilding(@RequestBody Building building) {
        Map<String, Object> response = buildingService.createBuilding(building);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/building/update")
    public ResponseEntity<Map<String, Object>> updateBuilding(@RequestBody Building building) {
        Map<String, Object> response = buildingService.updateBuilding(building);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/building/delete/id/{id}")
    public ResponseEntity<Map<String, Object>> deleteBuilding(@PathVariable Long id) {
        Map<String, Object> response = buildingService.deleteBuilding(id);
        return ResponseEntity.ok(response);
    }

    //---- GET ----\\

    @GetMapping("/building/get/id/{id}")
    public ResponseEntity<Map<String, Object>> getBuildingById(@PathVariable Long id) {
        Map<String, Object> response = buildingService.getBuildingById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/building/get/city/id/{cityId}")
    public ResponseEntity<Map<String, Object>> getBuildingsByCityId(@PathVariable Long cityId) {
        Map<String, Object> response = buildingService.getBuildingsByCityId(cityId);
        return ResponseEntity.ok(response);
    }
}
