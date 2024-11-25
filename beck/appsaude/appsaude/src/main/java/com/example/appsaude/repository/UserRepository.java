package com.example.appsaude.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.appsaude.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
