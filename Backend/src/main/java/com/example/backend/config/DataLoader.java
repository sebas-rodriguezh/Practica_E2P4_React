package com.example.backend.config;

import com.example.backend.model.Opcion;
import com.example.backend.model.Pregunta;
import com.example.backend.model.Usuario;
import com.example.backend.repository.OpcionRepository;
import com.example.backend.repository.PreguntaRepository;
import com.example.backend.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;
    private final PreguntaRepository preguntaRepository;
    private final OpcionRepository opcionRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UsuarioRepository usuarioRepository, PreguntaRepository preguntaRepository, OpcionRepository opcionRepository, PasswordEncoder passwordEncoder)
    {
        this.usuarioRepository = usuarioRepository;
        this.preguntaRepository = preguntaRepository;
        this.opcionRepository = opcionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args)
    {

        if (usuarioRepository.count() == 0)
        {
            usuarioRepository.save(new Usuario("JPerez", passwordEncoder.encode("1"), "Juan Perez",  "CLI"));
            usuarioRepository.save(new Usuario("MMata",  passwordEncoder.encode("1"), "Maria Mata",  "CLI"));
        }

        if (preguntaRepository.count() == 0)
        {

            Pregunta p;
            Opcion op1, op2, op3, op4;

            p = new Pregunta("What is java?", "Prog. Languages");
            op1 = new Opcion("A programming language");
            op2 = new Opcion("A scripting language");
            op3 = new Opcion("A animation language");
            opcionRepository.saveAll(Arrays.asList(op1, op2, op3));
            p.setOpciones(Arrays.asList(op1, op2, op3));
            p.setCorrectas(Arrays.asList(op1));
            preguntaRepository.save(p);

            p = new Pregunta("Not Object Oriented?", "Prog. Languages");
            op1 = new Opcion("C++");
            op2 = new Opcion("C");
            op3 = new Opcion("Java");
            op4 = new Opcion("C#");
            opcionRepository.saveAll(Arrays.asList(op1, op2, op3, op4));
            p.setOpciones(Arrays.asList(op1, op2, op3, op4));
            p.setCorrectas(Arrays.asList(op2));
            preguntaRepository.save(p);

            p = new Pregunta("Is HTML a programming language?", "Prog. Languages");
            op1 = new Opcion("Yes");
            op2 = new Opcion("No");
            opcionRepository.saveAll(Arrays.asList(op1, op2));
            p.setOpciones(Arrays.asList(op1, op2));
            p.setCorrectas(Arrays.asList(op2));
            preguntaRepository.save(p);

            p = new Pregunta("A sql keyword", "Data Bases");
            op1 = new Opcion("Insert");
            op2 = new Opcion("New");
            op3 = new Opcion("Update");
            opcionRepository.saveAll(Arrays.asList(op1, op2, op3));
            p.setOpciones(Arrays.asList(op1, op2, op3));
            p.setCorrectas(Arrays.asList(op1, op3));
            preguntaRepository.save(p);
        }
    }
}