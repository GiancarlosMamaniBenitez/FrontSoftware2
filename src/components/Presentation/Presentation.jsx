import React from 'react';

const Presentation = ({ tituloPresentacion, presentacionPersona,setPresentacion }) => {
  const handleTituloChange = (e) => {
    setPresentacion({ ...presentacion, titulo: e.target.value });
  };

  const handlePresentacionChange = (e) => {
    setPresentacion({ ...presentacion, presentacion: e.target.value });
  };

  return (
    <div className="presentacionUser">
      <div className="presentacion1">
          <label className="labelPrest1" htmlFor="titulo">Título</label>
          <input className="inputPrest1"
            type="text"
            id="titulo"
            value={tituloPresentacion}
            onChange={handleTituloChange}
          />
      </div>
      
      <div className="presentacion2">
          <label className="labelPrest2" htmlFor="presentacion">Presentación</label>
          <input className="inputPrest2"
            type="text"
            id="presentacion"
            value={presentacionPersona}
            onChange={handlePresentacionChange}
          />
      </div>

      
    </div>
  );
};

export default Presentation;
