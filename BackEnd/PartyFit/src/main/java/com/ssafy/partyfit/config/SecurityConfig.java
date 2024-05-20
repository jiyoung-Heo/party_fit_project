package com.ssafy.partyfit.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ssafy.partyfit.util.JwtUtil;

import filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	private final JwtUtil jwtUtil;

	public SecurityConfig(JwtUtil jwtUtil) {
		super();
		this.jwtUtil = jwtUtil;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
		return httpSecurity.httpBasic(httpBasic -> httpBasic.disable()).csrf(csrf -> csrf.disable())
				.sessionManagement(
						sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(
						authorize -> 
						authorize
						.requestMatchers("/swagger-ui/**").permitAll()
						.requestMatchers("/v3/api-docs/**").permitAll()
						.requestMatchers("/user/signup").permitAll()
						.requestMatchers("/user/login").permitAll()
						.requestMatchers("/user/*").permitAll()
						.requestMatchers("/user/find-pw/**").permitAll()
						.requestMatchers("/party/showParty").permitAll()
						.requestMatchers("/party").permitAll()
						.requestMatchers("/api/**").permitAll()
						.requestMatchers("/tui-editor/**").permitAll()
//						.requestMatchers("/**").permitAll().anyRequest().permitAll())
						.anyRequest().authenticated())
				.addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class).build();

	}
}
