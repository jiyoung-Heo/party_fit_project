package com.ssafy.partyfit.util;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	private String key = "SSAFY_NonMajor_JavaTrack_ScretKey";
	private SecretKey secretkey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
	
	public String createToken(int userId) {
		Date exp = new Date(System.currentTimeMillis()+1000*60*60); //1시간
		
		return Jwts.builder().header().add("typ","JWT").and().claim("userId",userId)
				.expiration(exp).signWith(secretkey).compact();
		
	}
	
	public Jws<Claims> validate(String token){
		
		return Jwts.parser().verifyWith(secretkey).build().parseSignedClaims(token);

	}
	
}
