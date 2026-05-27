import { useState, useEffect, useCallback } from "react";
import PreguntaModal from "../components/PreguntaModal";

const API = "http://localhost:8080";

function Preguntas({ usuario }) {
    const [topico, setTopico] = useState("");
    const [preguntas, setPreguntas] = useState([]);
    const [estadisticas, setEstadisticas] = useState({ aciertos: 0, fallos: 0, nota: 0 });
    const [preguntaActiva, setPreguntaActiva] = useState(null);
    const [buscado, setBuscado] = useState(false);

    const headers = { Authorization: `Bearer ${usuario.token}` };

    const cargarEstadisticas = useCallback(() => {
        fetch(`${API}/api/respuestas/estadisticas`, { headers })
            .then((r) => r.json())
            .then(setEstadisticas)
            .catch(() => {});
    }, [usuario.token]);

    useEffect(() => {
        cargarEstadisticas();
    }, [cargarEstadisticas]);

    async function buscar() {
        if (!topico.trim()) return;
        try {
            const res = await fetch(
                `${API}/api/preguntas/buscar?topico=${encodeURIComponent(topico)}`,
                { headers }
            );
            const data = await res.json();
            setPreguntas(data);
            setBuscado(true);
        } catch (e) {
            console.error(e);
        }
    }

    function onRespondida() {
        buscar();
        cargarEstadisticas();
    }

    return (
        <div style={styles.pagina}>

            {/* Barra de búsqueda y estadísticas */}
            <div style={styles.barra}>
                <label style={styles.label}>Tópico:</label>
                <input
                    style={styles.input}
                    value={topico}
                    onChange={(e) => setTopico(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && buscar()}
                />
                <button style={styles.btnBuscar} onClick={buscar}>Buscar</button>

                <span style={styles.stats}>
          Estadísticas: {estadisticas.aciertos} ✅ &nbsp;
                    {estadisticas.fallos} 🔴 &nbsp;
                    NOTA: {estadisticas.nota}
        </span>
            </div>

            {/* Tabla de resultados */}
            {!buscado ? (
                <p style={styles.mensaje}>
                    No hay datos que mostrar, ejecute una búsqueda con un tópico adecuado
                </p>
            ) : preguntas.length === 0 ? (
                <p style={styles.mensaje}>No se encontraron preguntas disponibles</p>
            ) : (
                <table style={styles.tabla}>
                    <thead>
                    <tr>
                        <th style={styles.th}>Id</th>
                        <th style={styles.th}>Pregunta</th>
                        <th style={styles.th}>Tópico</th>
                        <th style={styles.th}>...</th>
                    </tr>
                    </thead>
                    <tbody>
                    {preguntas.map((p) => (
                        <tr key={p.id} style={styles.tr}>
                            <td style={styles.td}>{p.id}</td>
                            <td style={styles.td}>{p.pregunta}</td>
                            <td style={styles.td}>{p.topico}</td>
                            <td style={styles.td}>
                  <span
                      style={styles.icono}
                      onClick={() => setPreguntaActiva(p)}
                      title="Responder"
                  >
                    ✏️
                  </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {/* Popup de pregunta */}
            {preguntaActiva && (
                <PreguntaModal
                    pregunta={preguntaActiva}
                    usuario={usuario}
                    cerrar={() => setPreguntaActiva(null)}
                    onRespondida={onRespondida}
                />
            )}
        </div>
    );
}

const styles = {
    pagina: {
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
    },
    barra: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "16px",
        flexWrap: "wrap",
    },
    label: {
        fontSize: "13px",
    },
    input: {
        padding: "4px 8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "13px",
        width: "160px",
    },
    btnBuscar: {
        padding: "4px 12px",
        backgroundColor: "#4a90d9",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "13px",
    },
    stats: {
        fontSize: "13px",
        marginLeft: "8px",
    },
    mensaje: {
        color: "#c00",
        fontSize: "13px",
        fontStyle: "italic",
    },
    tabla: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "13px",
    },
    th: {
        backgroundColor: "#3a6ea5",
        color: "#fff",
        padding: "6px 10px",
        textAlign: "left",
        border: "1px solid #ccc",
    },
    tr: {
        backgroundColor: "#dce9f8",
    },
    td: {
        padding: "5px 10px",
        border: "1px solid #ccc",
    },
    icono: {
        cursor: "pointer",
        fontSize: "14px",
    },
};

export default Preguntas;
