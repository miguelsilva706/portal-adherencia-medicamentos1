package com.certus.adherencia.service;

import com.certus.adherencia.dto.UsuarioDTO;
import com.certus.adherencia.entity.Usuario;
import com.certus.adherencia.exception.RecursoNoEncontradoException;
import com.certus.adherencia.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("No existe un usuario con ese correo"));

        return User.builder()
                .username(usuario.getCorreo())
                .password(usuario.getContrasena())
                .authorities(new SimpleGrantedAuthority("ROLE_" + usuario.getRol().name()))
                .disabled(!Boolean.TRUE.equals(usuario.getActivo()))
                .build();
    }

    public Usuario buscarPorCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado: " + correo));
    }

    public Usuario buscarPorId(Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new RecursoNoEncontradoException("Usuario no encontrado con id: " + id));
    }

    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    public boolean existeCorreo(String correo) {
        return usuarioRepository.existsByCorreo(correo);
    }

    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public UsuarioDTO aDTO(Usuario u) {
        return UsuarioDTO.builder()
                .id(u.getId())
                .nombreCompleto(u.getNombreCompleto())
                .correo(u.getCorreo())
                .telefono(u.getTelefono())
                .fechaNacimiento(u.getFechaNacimiento())
                .rol(u.getRol())
                .activo(u.getActivo())
                .build();
    }

    public Usuario actualizarPerfil(Usuario usuario) {
    return usuarioRepository.save(usuario);
}

public void cambiarPassword(Long id, String actual, String nueva) {
    Usuario u = buscarPorId(id);

    if (!u.getContrasena().equals(actual)) {
        throw new RuntimeException("Contraseña actual incorrecta");
    }

    u.setContrasena(nueva);
    usuarioRepository.save(u);
}
}

