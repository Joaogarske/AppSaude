package com.example.appsaude.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.appsaude.model.User;
import com.example.appsaude.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Registrar novo usuário
    public void registerUser(User user) {
        userRepository.save(user);
    }

    // Autenticar usuário
    public User authenticateUser(String username) {
        return userRepository.findByUsername(username);
    }
}
