
import '../ChipOriginal/Soriginal.css'

const Chip = ({ inicial, nombre, fecha }) => {
    const ini = inicial;
  
    // Convertir la fecha en un objeto Date
    const fechaObjeto = new Date(fecha);
  
    // Obtener los componentes de fecha y hora
    const year = fechaObjeto.getFullYear();
    const month = String(fechaObjeto.getMonth() + 1).padStart(2, "0");
    const day = String(fechaObjeto.getDate()).padStart(2, "0");
    const hours = String(fechaObjeto.getHours()).padStart(2, "0");
    const minutes = String(fechaObjeto.getMinutes()).padStart(2, "0");
    const seconds = String(fechaObjeto.getSeconds()).padStart(2, "0");
  
    return (
      <div className="chipA">
        <div className="log">{ini.charAt(0)}</div>
        <br />
        <span className="nombre">{nombre}</span>
        <span className="fecha">
          Fecha: {year}-{month}-{day}
          <br />
          Hora: {hours}:{minutes}:{seconds}
        </span>
      </div>
    );
  };

export default Chip