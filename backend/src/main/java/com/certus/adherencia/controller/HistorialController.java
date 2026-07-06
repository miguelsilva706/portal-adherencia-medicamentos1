package com.certus.adherencia.controller;

import com.certus.adherencia.dto.HistorialRequest;
import com.certus.adherencia.dto.HistorialResponse;
import com.certus.adherencia.service.HistorialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/historial")
@RequiredArgsConstructor
public class HistorialController {

    private final HistorialService historialService;

    @GetMapping
    public ResponseEntity<List<HistorialResponse>> listar() {

        return ResponseEntity.ok(
                historialService.listar()
        );

    }

    @GetMapping("/{id}")
    public ResponseEntity<HistorialResponse> obtener(
            @PathVariable Long id
    ) {

        return ResponseEntity.ok(
                historialService.obtenerPorId(id)
        );

    }

    @PostMapping
    public ResponseEntity<HistorialResponse> registrar(
            @Valid @RequestBody HistorialRequest request
    ) {

        return ResponseEntity.ok(
                historialService.registrar(request)
        );

    }

    @PutMapping("/{id}")
    public ResponseEntity<HistorialResponse> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody HistorialRequest request
    ) {

        return ResponseEntity.ok(
                historialService.actualizar(id, request)
        );

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Long id
    ) {

        historialService.eliminar(id);

        return ResponseEntity.noContent().build();

    }

}