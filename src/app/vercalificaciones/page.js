'use client';

import TabBar from '@/components/TabBar/TabBar';    
import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import PersonaApi from '@/api/persona.js'

import TabContent from 'react-bootstrap/TabContent';
import { Tab, Tabs, TabPane  } from 'react-bootstrap';
import TabContainer from 'react-bootstrap/TabContainer';

import Chip from '../../components/ChipG/ChipG.jsx'
import './styles.css'

const vercalificaciones=()=>{

    const calificaciones = [
        {
          nombre: 'Mario Lopez',
          fecha: '24 de abril de 2024',
          estrellas: 5,
          comentario: 'El profesor fue muy claro',
        },
        {
          nombre: 'Sandra Sanchez',
          fecha: '23 de abril de 2024',
          estrellas: 4.5,
          comentario: 'Por lo general estuvo bien',
        },
    ];
    return (
        <div className="vercalificaciones-container">
          <h2>Calificaciones</h2>
          <hr className="vercalificaciones-line" />
          {calificaciones.map((calificacion, index) => (
            <div key={index} className="calificacion-container">
              <div className="calificacion-circulo">
                <span className="calificacion-numero">{index + 1}</span>
              </div>
              <div className="calificacion-datos">
                <div>
                  <span className="calificacion-nombre">{calificacion.nombre}</span>
                  <span className="calificacion-fecha">{calificacion.fecha}</span>
                  <span className="calificacion-estrellas">{calificacion.estrellas} estrellas</span>
                </div>
                <div className="calificacion-comentario">{calificacion.comentario}</div>
              </div>
            </div>
          ))}
        </div>
      );
    };
    


export default vercalificaciones;