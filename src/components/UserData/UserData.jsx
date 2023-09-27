import React from 'react';
import { useState } from 'react'

const UserData = ({ usuario, setUsuario,persona  }) => {

  const [showDatosUsuario, setShowDatosUsuario ] = useState(true)
    



  const handleUsuarioChange = (e) => {
    setUsuario({ ...usuario, usuario: e.target.value });
  };

  const handleConstraseñaActualChange = (e) => {
    setUsuario({ ...usuario, constraseñaActual: e.target.value });
  };

  const handleNuevaContraseñaChange = (e) => {
    setUsuario({ ...usuario, nuevaContraseña: e.target.value });
  };

  const handleRepetirContraseñaChange = (e) => {
    setUsuario({ ...usuario, repetirContraseña: e.target.value });
  };

  return (
    <div class="DatoUsuario">
      <div className="user">
        <label className="labelUser" htmlFor="usuario">Usuario</label>
        <input className="inputUser"
          type="text"
          id="usuario"
          value={persona.nombre}
          onChange={handleUsuarioChange}
        />
      </div>
      
      <div className="password">
        <label className="labelPass"htmlFor="constraseñaActual">Contraseña Actual</label>
        <input className="inputPass"
          type="password"
          id="constraseñaActual"
          value={persona.contraseña}
          onChange={handleConstraseñaActualChange}
        />
      </div>
      
      <div className="newPass">
        <label className="labelNew"htmlFor="nuevaContraseña">Nueva Contraseña</label>
        <input className="inputNew"
          type="password"
          id="nuevaContraseña"
          value={usuario.nuevaContraseña}
          onChange={handleNuevaContraseñaChange}
        />
      </div>
      
      <div className="repPass">
        <label className="labelRep"htmlFor="repetirContraseña">Repetir Contraseña</label>
        <input className="inputRep"
          type="password"
          id="repetirContraseña"
          value={usuario.repetirContraseña}
          onChange={handleRepetirContraseñaChange}
        />
      </div>
      
    </div>
  );
};

export default UserData;
