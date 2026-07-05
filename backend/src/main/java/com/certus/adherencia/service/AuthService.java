package com.certus.adherencia.service;

import com.certus.adherencia.dto.LoginRequest;
import com.certus.adherencia.dto.LoginResponse;
import com.certus.adherencia.dto.RegistroRequest;
import com.certus.adherencia.entity.Usuario;
import com.certus.adherencia.exception.CredencialesInvalidasException;
import com.certus.adherencia.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getCorreo(), request.getContrasena())
            );
        } catch (BadCredentialsException ex) {
            throw new CredencialesInvalidasException("Correo o contraseña incorrectos");
        }

        Usuario usuario = usuarioService.buscarPorCorreo(request.getCorreo());

        UserDetails userDetails = usuarioService.loadUserByUsername(usuario.getCorreo());

        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", usuario.getRol().name());
        claims.put("nombre", usuario.getNombreCompleto());
        claims.put("id", usuario.getId());

        String token = jwtUtil.generarToken(userDetails, claims);

        return LoginResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuario(usuarioService.aDTO(usuario))
                .build();
    }

    public LoginResponse registrar(RegistroRequest request) {
        if (usuarioService.existeCorreo(request.getCorreo())) {
            throw new IllegalArgumentException("Ya existe un usuario registrado con ese correo");
        }

        Usuario usuario = Usuario.builder()
                .nombreCompleto(request.getNombreCompleto())
                .correo(request.getCorreo())
                .contrasena(passwordEncoder.encode(request.getContrasena()))
                .telefono(request.getTelefono())
                .rol(request.getRol())
                .activo(true)
                .build();

        usuario = usuarioService.guardar(usuario);

        UserDetails userDetails = usuarioService.loadUserByUsername(usuario.getCorreo());

        Map<String, Object> claims = new HashMap<>();
        claims.put("rol", usuario.getRol().name());
        claims.put("nombre", usuario.getNombreCompleto());
        claims.put("id", usuario.getId());

        String token = jwtUtil.generarToken(userDetails, claims);

        return LoginResponse.builder()
                .token(token)
                .tipo("Bearer")
                .usuario(usuarioService.aDTO(usuario))
                .build();
    }
}
