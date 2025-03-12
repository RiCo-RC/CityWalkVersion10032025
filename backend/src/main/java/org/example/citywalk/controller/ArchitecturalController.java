package org.example.citywalk.controller;

import org.example.citywalk.model.Architectural;
import org.example.citywalk.service.ArchitecturalService;
import org.example.citywalk.utils.Debug;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/architectural")
public class ArchitecturalController {

    private final ArchitecturalService architecturalService;
    private final Debug console = new Debug();

    public ArchitecturalController(ArchitecturalService architecturalService) {
        this.architecturalService = architecturalService;
    }

    @GetMapping
    public ResponseEntity<List<Architectural>> getAllArchitecturals() {
        List<Architectural> architecturals = architecturalService.getAllArchitecturals();
        console.log("Architectural list is empty: " + architecturals.isEmpty());
        if (architecturals.isEmpty()) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(architecturals);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Architectural> getArchitecturalById(@PathVariable Long id) {
        Architectural architectural = architecturalService.getArchitecturalById(id);
        console.log("Architectural: " + architectural);
        if (architectural == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(architectural);
    }

    @PostMapping
    public ResponseEntity<Architectural> createArchitectural(@RequestBody Architectural architectural) {
        Architectural createdArchitectural = architecturalService.createArchitectural(architectural);
        console.log("Architectural created: " + createdArchitectural);
        if (createdArchitectural == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(createdArchitectural);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Architectural> updateArchitectural(
            @PathVariable Long id,
            @RequestBody Architectural architectural
    ) {
        Architectural updatedArchitectural = architecturalService.updateArchitectural(id, architectural);
        console.log("Architectural updated: " + updatedArchitectural);
        if (updatedArchitectural == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(updatedArchitectural);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Architectural> deleteArchitectural(@PathVariable Long id) {
        boolean isDeleted = architecturalService.deleteArchitectural(id);
        console.log("Architectural deleted: " + isDeleted);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/building/{buildingId}")
    public ResponseEntity<List<Architectural>> getArchitecturalByCityId(@PathVariable Long buildingId) {
        List<Architectural> architecturals = architecturalService.getArchitecturalByBuildingId(buildingId);
        console.log("Architectural in building is empty: " + architecturals.isEmpty());
        if (architecturals.isEmpty()) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(architecturals);
    }
}
