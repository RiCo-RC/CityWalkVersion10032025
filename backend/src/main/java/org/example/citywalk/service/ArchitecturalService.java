package org.example.citywalk.service;

import org.example.citywalk.model.Architectural;
import org.example.citywalk.repository.ArchitecturalRepository;
import org.example.citywalk.utils.Debug;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArchitecturalService {

    private final ArchitecturalRepository architecturalRepository;
    private final Debug console = new Debug();

    public ArchitecturalService(ArchitecturalRepository architecturalRepository) {
        this.architecturalRepository = architecturalRepository;
    }

    public List<Architectural> getAllArchitecturals() {
        /*DEBUG*/
        console.log("ArchitecturalService.getAllArchitecturals | DEBUG: start");
        List<Architectural> architecturals = architecturalRepository.findAll();
        /*DEBUG*/
        if (architecturals.isEmpty())
            console.log("ArchitecturalService.getAllArchitecturals | ERROR: No architecturals found");
        if (architecturals.isEmpty()) return null;
        /*DEBUG*/
        console.loop(architecturals, "ArchitecturalService.getAllArchitecturals | DEBUG: end | List of architecturals:");
        return architecturals;
    }

    public Architectural getArchitecturalById(Long id) {
        /*DEBUG*/
        console.log("ArchitecturalService.getArchitecturalById | DEBUG: start | id: " + id);
        Architectural architectural = architecturalRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (architectural == null)
            console.log("ArchitecturalService.getArchitecturalById | ERROR: No architecturals found");
        if (architectural == null) return null;
        /*DEBUG*/
        console.log("ArchitecturalService.getArchitecturalById | DEBUG: end | id: " + id + " | data: " + architectural);
        return architectural;
    }

    public Architectural createArchitectural(Architectural architectural) {
        /*DEBUG*/
        console.log("ArchitecturalService.createArchitectural | DEBUG: start | data: " + architectural.toString());
        Architectural createdArchitectural = architecturalRepository.save(architectural);
        /*DEBUG*/
        if (createdArchitectural.getId() == null)
            console.log("ArchitecturalService.createArchitectural | ERROR: Architectural not found");
        if (createdArchitectural.getId() == null) return null;
        /*DEBUG*/
        console.log("ArchitecturalService.createArchitectural | DEBUG: end | data: " + createdArchitectural);
        return createdArchitectural;
    }

    public Architectural updateArchitectural(Long id, Architectural architectural) {
        /*DEBUG*/
        console.log("ArchitecturalService.updateArchitectural | DEBUG: start | id: " + id + " data: " + architectural.toString());
        Architectural updatedArchitectural = architecturalRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (updatedArchitectural == null)
            console.log("ArchitecturalService.updateArchitectural | ERROR: architectural not found");
        if (updatedArchitectural == null) return null;
        /*DEBUG*/
        console.log("ArchitecturalService.updateArchitectural | DEBUG: end - before updating | id: " + id + " | data: " + architectural);
        updatedArchitectural.setName(architectural.getName());
        updatedArchitectural.setDescription(architectural.getDescription());
        architecturalRepository.save(updatedArchitectural);
        /*DEBUG*/
        console.log("ArchitecturalService.updateArchitectural | DEBUG: end - before updating | id: " + id + " | data: " + architectural);
        return updatedArchitectural;
    }

    public boolean deleteArchitectural(Long id) {
        /*DEBUG*/
        console.log("ArchitecturalService.deleteArchitectural | DEBUG: start | id: " + id);
        Architectural deletedArchitectural = architecturalRepository.findById(id).orElse(null);
        /*DEBUG*/
        if (deletedArchitectural == null)
            console.log("ArchitecturalService.deleteArchitectural | ERROR: architectural not found");
        if (deletedArchitectural == null) return false;
        /*DEBUG*/
        console.log("ArchitecturalService.deleteArchitectural | DEBUG: end | id: " + id + " | data: " + deletedArchitectural);
        architecturalRepository.delete(deletedArchitectural);
        return true;
    }

    public List<Architectural> getArchitecturalByBuildingId(Long id) {
        /*DEBUG*/
        console.log("ArchitecturalService.getArchitecturalByBuildingId | DEBUG: start | id: " + id);
        List<Architectural> architecturalsInBuilding = architecturalRepository.findAllByBuildingId(id);
        /*DEBUG*/
        if (architecturalsInBuilding.isEmpty()) System.out.println("No architectural found");
        /*DEBUG*/
        if (architecturalsInBuilding.isEmpty())
            console.log("Architectural.getArchitecturalByBuildingId | ERROR: Architectural not found");
        if (architecturalsInBuilding.isEmpty()) return null;
        /*DEBUG*/
        console.loop(architecturalsInBuilding, "Architectural.getArchitecturalByBuildingId | DEBUG: end | List of architectural in building:");
        return architecturalsInBuilding;
    }
}
