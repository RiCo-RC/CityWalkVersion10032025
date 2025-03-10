package org.example.citywalk.utils;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

//  @Bean
//  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//    http
//      .csrf(csrf -> csrf.disable())
//      .authorizeHttpRequests((authz) -> authz
//        .requestMatchers("/buildings", "/cities", "/auth/**").permitAll() // Allow public access
//        .requestMatchers("/buildings/**", "/cities/**").hasRole("EXPERT") // Requires EXPERT role
//        .requestMatchers("/users/**/favorites/**").hasAnyRole("VISITOR", "EXPERT") // Requires VISITOR or EXPERT
//        .anyRequest().authenticated() // Require authentication for all other endpoints
//      )
//      .httpBasic(withDefaults())
//      .formLogin(withDefaults());
//    return http.build();
//  }

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(authorize -> authorize
        .anyRequest().permitAll()
      );
    return http.build();
  }
  @Bean
  public BCryptPasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}