package com.ssafy.partyfit.util;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtil {
    Logger logger = LoggerFactory.getLogger(getClass());

    private String key = "SSAFY_NonMajor_JavaTrack_SecretKey";
    private SecretKey secretkey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));

    public String generateToken(Authentication authentication) {
        String userId = authentication.getName(); // 사용자의 이름을 추출하여 사용합니다.
        return generateToken(userId);
    }

    public String generateToken(String userId) {
        Date exp = new Date(System.currentTimeMillis() + 1000 * 60 * 60); // 1시간

        return Jwts.builder().claim("userId", userId).setExpiration(exp).signWith(secretkey).compact();
    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(accessToken).getBody();
        String username = claims.get("userId", String.class);
        return new UsernamePasswordAuthenticationToken(username, null, getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getUserId(String token) {
        return Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody().get("userId").toString();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.info("잘못된 토큰 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 토큰입니다.");
        } catch (IllegalArgumentException | MalformedJwtException e) {
            logger.error(e.toString());
            logger.error(e.getMessage());
            logger.info("잘못된 토큰입니다.");
        }
        return false;
    }

    private Collection<SimpleGrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return authorities;
    }
}
