import { useState, useEffect } from "react";

const API = "http://localhost:8080";

function PreguntaModal({ pregunta, usuario, cerrar, onRespondida }) {
    const [opciones, setOpciones] = useState([]);
    const [seleccionada, setSeleccionada] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`${API}/api/preguntas/${pregunta.id}/opciones`, {
            headers: { Authorization: `Bearer ${usuario.token}` },
        })
            .then((r) => r.json())
            .then(setOpciones)
            .catch(() => setError("Error al cargar opciones"));
    }, [pregunta.id]);

    async function handleRegistrar() {
        if (!seleccionada) {
            setError("Seleccione una opción");
            return;
        }
        setError("");
        try {
            const res = await fetch(`${API}/api/respuestas`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${usuario.token}`,
                },
                body: JSON.stringify({ preguntaId: pregunta.id, opcionId: seleccionada }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al registrar");
                return;
            }
            onRespondida();
            cerrar();
        } catch (e) {
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h4 style={styles.titulo}>{pregunta.pregunta}</h4>

                {opciones.map((op) => (
                    <div key={op.id} style={styles.opcion}>
                        <input
                            type="radio"
                            name="opcion"
                            value={op.id}
                            checked={seleccionada === op.id}
                            onChange={() => setSeleccionada(op.id)}
                        />
                        <span style={styles.opcionTexto}>{op.texto}</span>
                    </div>
                ))}

                {error && <p style={styles.error}>{error}</p>}

                <button style={styles.btn} onClick={handleRegistrar}>Registrar</button>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "6px",
        width: "300px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    titulo: {
        margin: "0 0 16px 0",
        fontSize: "14px",
    },
    opcion: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "8px",
    },
    opcionTexto: {
        fontSize: "13px",
    },
    error: {
        color: "red",
        fontSize: "12px",
        margin: "8px 0",
    },
    btn: {
        marginTop: "12px",
        width: "100%",
        padding: "7px",
        backgroundColor: "#4a90d9",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "13px",
    },
};

export default PreguntaModal;
