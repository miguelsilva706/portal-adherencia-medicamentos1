package com.certus.adherencia.security;

import com.certus.adherencia.config.JwtConfig;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final JwtConfig jwtConfig;
    private final SecretKey signingKey;

    public JwtUtil(JwtConfig jwtConfig) {
        this.jwtConfig = jwtConfig;
        this.signingKey = Keys.hmacShaKeyFor(
                jwtConfig.getSecret().getBytes(StandardCharsets.UTF_8));
    }

    public String generarToken(UserDetails userDetails, Map<String, Object> extraClaims) {
        Date ahora = new Date();
        Date expiracion = new Date(ahora.getTime() + jwtConfig.getExpirationMs());

        Map<String, Object> claims = new HashMap<>(extraClaims);

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuer(jwtConfig.getIssuer())
                .issuedAt(ahora)
                .expiration(expiracion)
                .signWith(signingKey)
                .compact();
    }

    public String extraerCorreo(String token) {
        return extraerClaims(token).getSubject();
    }

    public boolean esTokenValido(String token, UserDetails userDetails) {
        final String correo = extraerCorreo(token);
        return correo.equals(userDetails.getUsername()) && !estaExpirado(token);
    }

    private boolean estaExpirado(String token) {
        return extraerClaims(token).getExpiration().before(new Date());
    }

    private Claims extraerClaims(String token) {
        return Jwts.parser()
                .verifyWith(signingKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
