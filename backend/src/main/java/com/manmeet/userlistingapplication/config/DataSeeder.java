package com.manmeet.userlistingapplication.config;

import com.manmeet.userlistingapplication.entity.User;
import com.manmeet.userlistingapplication.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    public DataSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return;
        }

        userRepository.save(newUser("Alice Johnson", "alice.johnson@example.com", true, "local"));
        userRepository.save(newUser("Bob Smith", "bob.smith@example.com", true, "google"));
        userRepository.save(newUser("Carol White", "carol.white@example.com", false, "local"));
        userRepository.save(newUser("David Brown", "david.brown@example.com", true, "github"));
        userRepository.save(newUser("Emma Davis", "emma.davis@example.com", true, "local"));
        userRepository.save(newUser("Frank Miller", "frank.miller@example.com", false, "google"));
        userRepository.save(newUser("Grace Wilson", "grace.wilson@example.com", true, "local"));
        userRepository.save(newUser("Henry Moore", "henry.moore@example.com", true, "github"));
    }

    private User newUser(String name, String email, boolean enabled, String provider) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setEnabled(enabled);
        user.setProvider(provider);
        return user;
    }
}