package com.example.backend.model;
import jakarta.persistence.*;

@Entity
@Table(name = "usuarios")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String rol; // "CLI" o "ADMIN"

    public Usuario() {}

    public Usuario(String username, String password, String name, String rol) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.rol = rol;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String u) { this.username = u; }

    public String getPassword() { return password; }
    public void setPassword(String p) { this.password = p; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
