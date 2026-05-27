package com.example.backend.controller;

import com.example.backend.model.EstadisticasResponse;
import com.example.backend.model.RespuestaRequest;
import com.example.backend.service.RespuestaService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/respuestas")
@CrossOrigin(origins = "*")
public class RespuestaController {

    private final RespuestaService respuestaService;

    public RespuestaController(RespuestaService respuestaService) {
        this.respuestaService = respuestaService;
    }

    @PostMapping
    public ResponseEntity<?> registrar(@RequestBody RespuestaRequest request, Authentication authentication) {
        try {
            boolean correcta = respuestaService.registrarRespuesta(request, authentication.getName());
            return ResponseEntity.ok(Collections.singletonMap("correcta", correcta));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }

    @GetMapping("/estadisticas")
    public ResponseEntity<?> estadisticas(Authentication authentication)
    {
        try {
            EstadisticasResponse stats = respuestaService.obtenerEstadisticas(authentication.getName());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", e.getMessage()));
        }
    }
}