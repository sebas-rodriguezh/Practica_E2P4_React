import { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar({ usuario, setUsuario }) {
    const [mostrarLogin, setMostrarLogin] = useState(false);

    function cerrarSesion() {
        setUsuario(null);
    }

    return (
        <>
            <nav style={styles.nav}>
                <span style={styles.brand}>🌐 Sistema de Autoevaluación</span>
                <div style={styles.links}>
                    <Link to="/" style={styles.link}>Inicio</Link>

                    {usuario ? (
                        <>
                            <Link to="/questions" style={styles.link}>Preguntas</Link>
                            <span style={styles.userBtn} onClick={cerrarSesion}>
                👤 {usuario.username}
              </span>
                        </>
                    ) : (
                        <span style={styles.link} onClick={() => setMostrarLogin(true)}>
              Login
            </span>
                    )}
                </div>
            </nav>

            {mostrarLogin && (
                <LoginModal
                    setUsuario={setUsuario}
                    cerrar={() => setMostrarLogin(false)}
                />
            )}
        </>
    );
}

const styles = {
    nav: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 20px",
        backgroundColor: "#f0f0f0",
        borderBottom: "1px solid #ccc",
    },
    brand: {
        fontWeight: "bold",
        fontSize: "14px",
    },
    links: {
        display: "flex",
        alignItems: "center",
        gap: "16px",
    },
    link: {
        textDecoration: "none",
        color: "#333",
        cursor: "pointer",
        fontSize: "14px",
    },
    userBtn: {
        cursor: "pointer",
        color: "#333",
        fontSize: "14px",
        fontWeight: "bold",
    },
};

export default Navbar;
