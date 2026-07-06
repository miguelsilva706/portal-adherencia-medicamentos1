package com.certus.adherencia.config;

import com.certus.adherencia.dto.RegistroRequest;
import com.certus.adherencia.entity.Rol;
import com.certus.adherencia.service.AuthService;
import com.certus.adherencia.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UsuarioService usuarioService;
    private final AuthService authService;

    @Override
    public void run(String... args) {

        if (!usuarioService.existeCorreo("admin@certus.edu.pe")) {

            RegistroRequest request = new RegistroRequest();
            request.setNombreCompleto("Administrador");
            request.setCorreo("admin@certus.edu.pe");
            request.setContrasena("123456");
            request.setTelefono("999999999");
            request.setRol(Rol.ADMINISTRADOR);

            authService.registrar(request);

            System.out.println("==========================================");
            System.out.println("ADMINISTRADOR CREADO CORRECTAMENTE");
            System.out.println("Correo: admin@certus.edu.pe");
            System.out.println("Contraseña: 123456");
            System.out.println("==========================================");
        }
    }
}