package com.example.backend.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "preguntas")
public class Pregunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String pregunta;

    @Column(nullable = false)
    private String topico;

    @JsonIgnore
    @OneToMany(mappedBy = "pregunta", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Opcion> opciones = new ArrayList<>();

    public Pregunta() {}

    public Pregunta(String pregunta, String topico) {
        this.pregunta = pregunta;
        this.topico   = topico;
    }

    public void setOpciones(List<Opcion> opciones) {
        this.opciones = opciones;
        opciones.forEach(o -> o.setPregunta(this));
    }

    public void setCorrectas(List<Opcion> correctas) {
        correctas.forEach(o -> o.setEsCorrecta(true));
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPregunta() { return pregunta; }
    public void setPregunta(String p) { this.pregunta = p; }

    public String getTopico() { return topico; }
    public void setTopico(String t) { this.topico = t; }

    public List<Opcion> getOpciones() { return opciones; }

}
