package com.certus.adherencia.controller;

import com.certus.adherencia.dto.MedicamentoRequest;
import com.certus.adherencia.dto.MedicamentoResponse;
import com.certus.adherencia.service.MedicamentoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicamentos")
@RequiredArgsConstructor
public class MedicamentoController {

    private final MedicamentoService medicamentoService;

    @GetMapping
    public List<MedicamentoResponse> listarTodos() {
        return medicamentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public MedicamentoResponse buscarPorId(@PathVariable Long id) {
        return medicamentoService.buscarPorId(id);
    }

    @PostMapping
    public MedicamentoResponse crear(@Valid @RequestBody MedicamentoRequest request) {
        return medicamentoService.crear(request);
    }

    @PutMapping("/{id}")
    public MedicamentoResponse actualizar(
            @PathVariable Long id,
            @Valid @RequestBody MedicamentoRequest request) {

        return medicamentoService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        medicamentoService.eliminar(id);
    }
}