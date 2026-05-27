import heroImg from '../assets/hero.png';

function Inicio() {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center text-center">
                <div className="col-md-8">
                    <h2 className="display-5 text-secondary mb-4 font-italic">
                        Bienvenido al conocimiento...
                    </h2>

                    <img
                        src={heroImg}
                        alt="Hero Autoevaluación"
                        className="img-fluid rounded shadow-sm mb-4"
                        style={{ maxHeight: "400px", objectFit: "cover" }}
                    />

                    <p className="lead text-muted">
                        Pon a prueba tus habilidades informáticas y mejora tu rendimiento a través de la práctica constante.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Inicio;