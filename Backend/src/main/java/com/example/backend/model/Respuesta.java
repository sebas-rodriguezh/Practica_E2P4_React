package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "respuestas")
public class Respuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "opcion_id", nullable = false)
    private Opcion opcion;

    @Column(nullable = false)
    private boolean correcta;

    @Column(nullable = false)
    private LocalDateTime fecha;

    public Respuesta() {}

    public Respuesta(Usuario usuario, Pregunta pregunta, Opcion opcion, boolean correcta) {
        this.usuario = usuario;
        this.pregunta = pregunta;
        this.opcion = opcion;
        this.correcta = correcta;
        this.fecha = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario u) { this.usuario = u; }

    public Pregunta getPregunta() { return pregunta; }
    public void setPregunta(Pregunta p) { this.pregunta = p; }

    public Opcion getOpcion() { return opcion; }
    public void setOpcion(Opcion o) { this.opcion = o; }

    public boolean isCorrecta() { return correcta; }
    public void setCorrecta(boolean c) { this.correcta = c; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime f) { this.fecha = f; }

}
