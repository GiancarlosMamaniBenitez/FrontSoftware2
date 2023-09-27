import React, { useState } from 'react';
import Chip from '../../components/ChipG/ChipG.jsx';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import UniversidadesApi from '@/app/api/universidades.js';

const University = ({ universidades, carreras, cursos  }) => {
  const [textBusqueda1, setTextBusqueda1] = useState('');
  const [textBusqueda2, setTextBusqueda2] = useState('');
  const [textBusqueda3, setTextBusqueda3] = useState('');

  const handleUniversidadChange = (e) => {
    setTextBusqueda1(e.target.value);
  };

  const handleCarreraChange = (e) => {
    setTextBusqueda2(e.target.value);
  };

  const handleCursoChange = (e) => {
    setTextBusqueda3(e.target.value);
  };

  

  return (
    <div className="universidadControl">
      <div className="control1">
        
        <label>Universidad</label>
        <Form.Control className="form1"
          type="text"
          id="universidad"
          value={textBusqueda1}
          onChange={handleUniversidadChange}
        />

        <ul className="nobullets">
          {universidades
          .map((universidad) => universidad.descripcion)
            .filter((universidad) => universidad.includes(textBusqueda1))
            .map((descripcion) => {
              return (
                <li key={descripcion}>
                  <Chip text={descripcion} />
                </li>
              );
            })}
        </ul>
      </div>

      

      <div className="control3">
        
        <label>Agregar Cursos</label>
        <Form.Control className="form3"
          type="text"
          id="curso"
          value={textBusqueda3}
          onChange={handleCursoChange}
        />

        <ul className="nobullets">
          {cursos
            .filter((curso) => curso.includes(textBusqueda3))
            .map((curso) => {
              return (
                <li key={curso}>
                  <Chip text={curso} />
                </li>
              );
            })}
        </ul>
      </div>

      <div className="control2">
        
        <label>Carrera</label>
        <Form.Control className="form2"
          type="text"
          id="carrera"
          value={textBusqueda2}
          onChange={handleCarreraChange}
        />

        <ul className="nobullets">
          {carreras
            .filter((carrera) => carrera.includes(textBusqueda2))
            .map((carrera) => {
              return (
                <li key={carrera}>
                  <Chip text={carrera} />
                </li>
              );
            })}
        </ul>
      </div>

    </div>
  );
};

export default University;
