package com.example.backend.controller;

import com.example.backend.model.Opcion;
import com.example.backend.model.Pregunta;
import com.example.backend.service.PreguntaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/preguntas")
@CrossOrigin(origins = "*")
public class PreguntaController {

    private final PreguntaService preguntaService;

    public PreguntaController(PreguntaService preguntaService) {
        this.preguntaService = preguntaService;
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscar(@RequestParam("topico") String topico, Authentication authentication) {
        try {
            List<Pregunta> preguntas = preguntaService.buscarPorTopico(topico, authentication.getName());
            return ResponseEntity.ok(preguntas);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("/{id}/opciones")
    public ResponseEntity<?> obtenerOpciones(@PathVariable Long id) {
        try {
            List<Opcion> opciones = preguntaService.obtenerOpciones(id);
            return ResponseEntity.ok(opciones);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}