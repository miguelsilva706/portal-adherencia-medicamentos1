package com.certus.adherencia.security;

import com.certus.adherencia.service.UsuarioService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtro que se ejecuta una vez por solicitud: extrae el token JWT del
 * header Authorization, lo valida y, de ser correcto, autentica al usuario
 * en el contexto de seguridad de Spring.
 */
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final String HEADER = "Authorization";
    private static final String PREFIJO = "Bearer ";

    private final JwtUtil jwtUtil;
    private final UsuarioService usuarioService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                     @NonNull HttpServletResponse response,
                                     @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        final String header = request.getHeader(HEADER);

        if (header == null || !header.startsWith(PREFIJO)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = header.substring(PREFIJO.length());
        final String correo = jwtUtil.extraerCorreo(token);

        if (correo != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = usuarioService.loadUserByUsername(correo);

            if (jwtUtil.esTokenValido(token, userDetails)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}
