function Inicio() {
    return (
        <div style={styles.contenedor}>
            <h2 style={styles.texto}>Bienvenido al conocimiento...</h2>
        </div>
    );
}

const styles = {
    contenedor: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
    },
    texto: {
        color: "#555",
        fontStyle: "italic",
        fontWeight: "normal",
    },
};

export default Inicio;