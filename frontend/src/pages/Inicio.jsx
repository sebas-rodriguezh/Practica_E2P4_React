function Inicio() {
    return (
        <div style={styles.contenedor}>
            <h2 style={styles.texto}>Bienvenido al conocimiento...</h2>
            {/* Acá podríamos poner un texto y abajo una imagen para ver como se maneja eso en React. */}
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