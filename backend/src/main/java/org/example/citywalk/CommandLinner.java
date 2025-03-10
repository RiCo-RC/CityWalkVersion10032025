package org.example.citywalk;

import org.example.citywalk.model.Building;
import org.example.citywalk.model.City;
import org.example.citywalk.model.User;
import org.example.citywalk.repository.BuildingRepository;
import org.example.citywalk.repository.CityRepository;
import org.example.citywalk.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Configuration
public class CommandLinner {

  @Bean
  public CommandLineRunner initData(UserRepository userRepository, CityRepository cityRepository, BuildingRepository buildingRepository) {
    final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    return args -> {

      // 🔹 Création de l'utilisateur admin si non existant
      if (userRepository.findByUsername("admin").isEmpty()) {
        User adminUser = new User(
          "Admin",
          "User",
          "admin",
          "admin@example.com",
          "1234",
          "Expert",
          true
        );
        adminUser.setPassword(passwordEncoder.encode(adminUser.getPassword()));
        adminUser.setCreatedAt(LocalDateTime.now());
        adminUser.setUpdatedAt(LocalDateTime.now());
        userRepository.save(adminUser);
        System.out.println("✅ Utilisateur admin créé !");
      } else {
        System.out.println("ℹ️ L'utilisateur admin existe déjà.");
      }

      // 🔹 Vérification si la ville existe déjà
      Optional<City> existingCity = cityRepository.findByNameWithBuildings("Fribourg");

      if (existingCity.isPresent()) {
        System.out.println("ℹ️ La ville Fribourg existe déjà avec " + existingCity.get().getBuildings().size() + " bâtiments.");
      }

      // 🔹 Création de la ville si elle n'existe pas
      City city;
      if (existingCity.isEmpty()) {
        city = new City("Fribourg", 47.9961, 7.8534, 0.015, 0.015);
        city.setCreatedAt(LocalDateTime.now());
        city.setUpdatedAt(LocalDateTime.now());
        city = cityRepository.save(city);
        System.out.println("✅ Ville Fribourg créée !");
      } else {
        city = existingCity.get();
      }

      // 🔹 Vérification et ajout des bâtiments
      if (buildingRepository.count() == 0) {
        List<Building> buildings = List.of(
          new Building("Cathédrale de Fribourg", "Magnifique cathédrale gothique datant du 13e siècle.", 47.9958, 7.8522),
          new Building("Schwabentor", "L'une des portes médiévales emblématiques de la ville.", 47.9934, 7.8572),
          new Building("Augustiner Museum", "Musée d'art installé dans un ancien monastère.", 47.9944, 7.8529),
          new Building("Seepark", "Un magnifique parc avec un lac, parfait pour la détente.", 48.0074, 7.8186),
          new Building("Université de Fribourg", "Une des plus anciennes universités d'Allemagne.", 47.9935, 7.8457),
          new Building("Schlossberg", "Colline offrant une vue panoramique sur Fribourg.", 47.9975, 7.8605)
        );

        // Associer la ville aux bâtiments et sauvegarder
        for (Building building : buildings) {
          building.setCity(city);
          building.setCreatedAt(LocalDateTime.now());
          building.setUpdatedAt(LocalDateTime.now());
          city.addBuilding(building);
        }

        buildingRepository.saveAll(buildings);
        System.out.println("✅ Bâtiments ajoutés pour la ville de Fribourg !");
      } else {
        System.out.println("ℹ️ Les bâtiments existent déjà.");
      }

      System.out.println("🎉 Données initialisées !");
    };
  }
}