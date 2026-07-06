package com.certus.adherencia.controller;

import com.certus.adherencia.dto.PasswordRequest;
import com.certus.adherencia.dto.UsuarioDTO;
import com.certus.adherencia.dto.UsuarioUpdateRequest;
import com.certus.adherencia.entity.Usuario;
import com.certus.adherencia.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/me")
    public ResponseEntity<UsuarioDTO> perfilActual(Authentication authentication) {
        String correo = authentication.getName();
        Usuario usuario = usuarioService.buscarPorCorreo(correo);
        return ResponseEntity.ok(usuarioService.aDTO(usuario));
    }

    @PutMapping("/me")
    public ResponseEntity<UsuarioDTO> actualizarPerfil(
            Authentication authentication,
            @RequestBody UsuarioUpdateRequest request) {

        String correo = authentication.getName();
        Usuario usuario = usuarioService.buscarPorCorreo(correo);

        usuario.setNombreCompleto(request.getNombreCompleto());
        usuario.setTelefono(request.getTelefono());

        Usuario actualizado = usuarioService.guardar(usuario);

        return ResponseEntity.ok(usuarioService.aDTO(actualizado));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> cambiarPassword(
            Authentication authentication,
            @RequestBody PasswordRequest request) {

        String correo = authentication.getName();
        Usuario usuario = usuarioService.buscarPorCorreo(correo);

        usuarioService.cambiarPassword(
                usuario.getId(),
                request.getPasswordActual(),
                request.getPasswordNueva()
        );

        return ResponseEntity.ok().build();
    }
}