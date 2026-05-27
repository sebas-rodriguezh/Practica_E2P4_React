import heroImg from '../assets/hero.png';

function Inicio() {
    return (
        <div className="text-center">
            <h2>Bienvenido al sistema</h2>
            <p>Mejora tus conocimientos con la autoevaluación.</p>
            <img
                src={heroImg}
                alt="Hero"
                className="img-fluid mt-3"
                style={{ maxWidth: "400px" }}
            />
        </div>
    );
}

export default Inicio;