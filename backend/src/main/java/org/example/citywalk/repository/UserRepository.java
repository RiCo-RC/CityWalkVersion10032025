package org.example.citywalk.repository;

import org.example.citywalk.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findOneUserByUsername(String username);

    List<User> findByUsername(String username);
}

