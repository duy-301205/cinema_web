package com.dyu.moviehub.configuration;

import com.dyu.moviehub.entity.User;
import com.dyu.moviehub.enums.Role;
import com.dyu.moviehub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner initAdminAccount() {
        return args -> {
            try {
                String adminEmail = "admin@gmail.com";
                if (userRepository.findByEmail(adminEmail).isEmpty()) {
                    User admin = User.builder()
                            .fullName("admin")
                            .password(passwordEncoder.encode("88888888"))
                            .email(adminEmail)
                            .phone("0123456789")
                            .role(Role.ADMIN)
                            .avatarUrl("https://tse3.mm.bing.net/th/id/OIP.kHNaMvaG8_AHwBsd_AKpCgHaHa?pid=Api&P=0&h=220")
                            .build();
                    userRepository.save(admin);
                }
            } catch (Exception e) {
                System.err.println(">>> Lỗi khi khởi tạo Admin: " + e.getMessage());
            }
        };
    }
}
