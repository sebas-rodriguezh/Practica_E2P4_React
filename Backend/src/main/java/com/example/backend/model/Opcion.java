package com.example.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "opciones")
public class Opcion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String texto;

    @JsonIgnore
    @Column(nullable = false)
    private boolean esCorrecta = false;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pregunta_id", nullable = false)
    private Pregunta pregunta;

    public Opcion() {}

    public Opcion(String texto) {
        this.texto = texto;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTexto() { return texto; }
    public void setTexto(String texto) { this.texto = texto; }

    @JsonIgnore
    public boolean isEsCorrecta() { return esCorrecta; }
    public void setEsCorrecta(boolean b) { this.esCorrecta = b; }

    @JsonIgnore
    public Pregunta getPregunta() { return pregunta; }
    public void setPregunta(Pregunta p) { this.pregunta = p; }
}
