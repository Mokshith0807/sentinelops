package com.sentinelops.auth.bootstrap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.sentinelops.auth.entity.Role;
import com.sentinelops.auth.entity.User;
import com.sentinelops.auth.repository.RoleRepository;
import com.sentinelops.auth.repository.UserRepository;

@Component
public class AdminBootstrapRunner implements ApplicationRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.bootstrap.admin.email:}")
    private String adminEmail;

    @Value("${app.bootstrap.admin.password:}")
    private String adminPassword;

    public AdminBootstrapRunner(UserRepository userRepository, RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(ApplicationArguments args) {
        if (adminEmail == null || adminEmail.isBlank()) {
            return;
        }
        Role admin = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        User user = userRepository.findByEmail(adminEmail.trim()).orElse(null);

        if (user == null) {
            if (adminPassword == null || adminPassword.isBlank()) {
                System.out.println("Admin bootstrap: no user found for " + adminEmail
                        + " and no bootstrap password set, skipping");
                return;
            }
            String base = adminEmail.split("@")[0].replaceAll("[^a-zA-Z0-9]", "");
            String username = base.isBlank() ? "admin" : base;
            if (userRepository.existsByUsername(username)) {
                username = username + "_admin";
            }
            User fresh = new User();
            fresh.setUsername(username);
            fresh.setEmail(adminEmail.trim());
            fresh.setPassword(passwordEncoder.encode(adminPassword));
            fresh.setRole(admin);
            fresh.setCreatedAt(java.time.LocalDateTime.now());
            fresh.setUpdatedAt(java.time.LocalDateTime.now());
            userRepository.save(fresh);
            System.out.println("Admin bootstrap: seeded ADMIN " + adminEmail);
            return;
        }

        if (user.getRole() == null || !"ADMIN".equals(user.getRole().getName())) {
            user.setRole(admin);
            userRepository.save(user);
            System.out.println("Admin bootstrap: promoted " + adminEmail + " to ADMIN");
        }
    }
}
