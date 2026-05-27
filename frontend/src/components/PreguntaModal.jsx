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
    }, [pregunta.id, usuario.token]);

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
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>

            <div className="bg-white p-4 border rounded" style={{ width: "400px" }}>
                <h6>{pregunta.pregunta}</h6>

                <div className="mb-3">
                    {opciones.map((op) => (
                        <div key={op.id}>
                            <input
                                type="radio"
                                name="opcion"
                                id={`opcion-${op.id}`}
                                value={op.id}
                                checked={seleccionada === op.id}
                                onChange={() => setSeleccionada(op.id)}
                            />
                            <label htmlFor={`opcion-${op.id}`} className="ms-2">
                                {op.texto}
                            </label>
                        </div>
                    ))}
                </div>

                {error && <p className="text-danger">{error}</p>}

                <div>
                    <button className="btn btn-success btn-sm me-2" onClick={handleRegistrar}>Registrar</button>
                    <button className="btn btn-secondary btn-sm" onClick={cerrar}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default PreguntaModal;