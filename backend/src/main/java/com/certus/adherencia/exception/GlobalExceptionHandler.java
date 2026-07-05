package com.certus.adherencia.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNoEncontradoException.class)
    public ResponseEntity<Object> manejarNoEncontrado(RecursoNoEncontradoException ex) {
        return construir(HttpStatus.NOT_FOUND, ex.getMessage());
    }

    @ExceptionHandler({CredencialesInvalidasException.class, BadCredentialsException.class})
    public ResponseEntity<Object> manejarCredencialesInvalidas(RuntimeException ex) {
        return construir(HttpStatus.UNAUTHORIZED, "Correo o contraseña incorrectos");
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> manejarValidacion(MethodArgumentNotValidException ex) {

        Map<String, String> errores = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
                errores.put(error.getField(), error.getDefaultMessage()));

        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("status", HttpStatus.BAD_REQUEST.value());
        cuerpo.put("mensaje", "Error de validación");
        cuerpo.put("errores", errores);

        return ResponseEntity.badRequest().body(cuerpo);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Object> manejarIllegalArgument(IllegalArgumentException ex) {
        return construir(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> manejarGeneral(Exception ex) {

        // Imprime el error completo en la consola
        System.err.println("========== ERROR NO CONTROLADO ==========");
        ex.printStackTrace();

        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        cuerpo.put("mensaje", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(cuerpo);
    }

    private ResponseEntity<Object> construir(HttpStatus status, String mensaje) {

        Map<String, Object> cuerpo = new HashMap<>();
        cuerpo.put("timestamp", LocalDateTime.now());
        cuerpo.put("status", status.value());
        cuerpo.put("mensaje", mensaje);

        return ResponseEntity.status(status).body(cuerpo);
    }
}