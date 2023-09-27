import React from 'react';
import PersonasApi from '@/app/api/personas';
const PersonalInfo = ({persona, setPersona, nombre, apellido, tipoDocumento, numeroDocumento, idRol }) => {
  const handleNombresChange = (e) => {
    setPersona({ ...persona, nombre: e.target.value });
  };

  const handleApellidosChange = (e) => {
    setPersona({ ...persona, apellido: e.target.value });
  };

  const handleTipoDocumentoChange = (e) => {
    setPersona({ ...persona, tipodocumento: e.target.value });
  };

  const handleNumeroChange = (e) => {
    setPersona({ ...persona, dni: e.target.value });
  };

  const handleRolChange = (e) => {
    setPersona({ ...persona, idrol: e.target.value });
  };

  return (
    <div className="Datos">
      <h3>Información Personal</h3>

      <div className="ParteDatos">
              <div className="NombrePersona">
                  <label className="label1" htmlFor="nombre">Nombres</label>
                  <input className="input1"
                    type="text"
                    id="nombre"
                    value={nombre}
                    onChange={handleNombresChange}
                  />
              </div>
              
              <div className="ApellidoPersona">
                <label className="label2" htmlFor="apellido">Apellidos</label>
                <input className="input2"
                  type="text"
                  id="apellido"
                  value={apellido}
                  onChange={handleApellidosChange}
                />
              </div>
              <div className="TipoDocumento">
                  <label className="label3" htmlFor="tipoDocumento">Tipo de documento</label>
                  <input className="input3"
                    type="text"
                    id="tipoDocumento"
                    value={tipoDocumento}
                    onChange={handleTipoDocumentoChange}
                  />
              </div>

              <div className="Rol">
                <label className="label5" htmlFor="idRol">Rol</label>
                <input className="input5"
                  type="text"
                  id="idRol"
                  value={idRol}
                  onChange={handleRolChange}
                />
              </div>

              <div className="Numero">
                <label className="label4" htmlFor="numeroDocumento">Número</label>
                <input className="input4"
                  type="text"
                  id="numeroDocumento"
                  value={numeroDocumento}
                  onChange={handleNumeroChange}
                />
              </div>
      </div>
      

      
    </div>
  );
};

export default PersonalInfo;
