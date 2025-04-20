import FadeContent from './FadeContent';
import '../Css/Home.css';

const Home = () => {
  return (
    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
      <h1 className='titleSobreNosotros'>Quienes Somos?</h1>
      <div className="zona-personal">
        <div className="tarjeta-personal">
          <img src="fondo1.jpg" alt="Imagen de Joan" className="imagen-personal" />
          <h4 className="nombre-personal">Joan</h4>
          <p>Profesor en mujers</p>
        </div>

        <div className="tarjeta-personal">
          <img src="fondo1.jpg" alt="Imagen de Demetrio" className="imagen-personal" />
          <h4 className="nombre-personal">Demetrio</h4>
          <p>Muto</p>
        </div>
      </div>
    </FadeContent>
  );
};

export default Home;

