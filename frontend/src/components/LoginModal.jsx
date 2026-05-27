import { useState } from "react";

const API = "http://localhost:8080";

function LoginModal({ setUsuario, cerrar }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin() {
        setError("");
        try {
            const res = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al ingresar");
                return;
            }
            setUsuario({ token: data.token, username: data.username, name: data.name });
            cerrar();
        } catch (e) {
            setError("No se pudo conectar con el servidor");
        }
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h4 style={styles.titulo}>Login</h4>

                <div style={styles.campo}>
                    <label style={styles.label}>Usuario</label>
                    <input
                        style={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div style={styles.campo}>
                    <label style={styles.label}>Clave</label>
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                </div>

                {error && <p style={styles.error}>{error}</p>}

                <button style={styles.btn} onClick={handleLogin}>Ingresar</button>
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
        width: "260px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    },
    titulo: {
        margin: "0 0 16px 0",
        fontSize: "16px",
    },
    campo: {
        marginBottom: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    label: {
        fontSize: "13px",
        color: "#555",
    },
    input: {
        padding: "5px 8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "13px",
    },
    error: {
        color: "red",
        fontSize: "12px",
        margin: "0 0 8px 0",
    },
    btn: {
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

export default LoginModal;
