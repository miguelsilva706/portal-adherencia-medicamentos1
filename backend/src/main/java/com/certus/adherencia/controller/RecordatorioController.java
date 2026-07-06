package com.certus.adherencia.controller;

import com.certus.adherencia.dto.RecordatorioRequest;
import com.certus.adherencia.dto.RecordatorioResponse;
import com.certus.adherencia.service.RecordatorioService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recordatorios")
@RequiredArgsConstructor
public class RecordatorioController {

    private final RecordatorioService recordatorioService;

    @GetMapping
    public List<RecordatorioResponse> listarTodos() {
        return recordatorioService.listarTodos();
    }

    @GetMapping("/{id}")
    public RecordatorioResponse buscarPorId(@PathVariable Long id) {
        return recordatorioService.buscarPorId(id);
    }

    @PostMapping
    public RecordatorioResponse crear(
            @Valid @RequestBody RecordatorioRequest request) {

        return recordatorioService.crear(request);
    }

    @PutMapping("/{id}")
    public RecordatorioResponse actualizar(
            @PathVariable Long id,
            @Valid @RequestBody RecordatorioRequest request) {

        return recordatorioService.actualizar(id, request);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        recordatorioService.eliminar(id);
    }
}