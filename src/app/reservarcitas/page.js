'use client'
import './styles.css'
import React, { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import Form from 'react-bootstrap/Form';
import CalendarIcon from "../../components/CalendarIcon/CalendarIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const reservarcitas = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');

    // Datos de ejemplo de la información del docente
    const teacherData = {
        nombres: 'Nombre del Docente',
        grado: 'Grado del Docente',
        foto: 'URL de la foto',
        descripcion: 'Descripción profesional del Docente',
        correo: 'Correo electrónico del Docente',
        cursos: ['Curso 1', 'Curso 2', 'Curso 3'],
    };

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes procesar los datos seleccionados (selectedDate y selectedCourse)
        // y realizar las acciones necesarias, como enviar la solicitud de cita al docente.
    };

    // Función para manejar la selección de fecha
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

  return (
    <div>
      <h3>Citas</h3>
      <hr />
      <div>
        <h4>{teacherData.nombres}</h4>
        <p>{teacherData.grado}</p>
      </div>
      <div className="teacher-info">
        <div className="teacher-photo">
          <img src={teacherData.foto} alt="Foto del Docente" />
        </div>
        <div className="teacher-description">
          <p>{teacherData.descripcion}</p>
          <p>{teacherData.correo}</p>
        </div>
      </div>
      <div className="courses">
        <h5>Cursos</h5>
        <ul>
          {teacherData.cursos.map((curso, index) => (
            <li key={index}>{curso}</li>
          ))}
        </ul>
      </div>

      <h3>Fechas y horarios disponibles</h3>
      <hr />
      <div className="date-selection">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="fecha">
            <Form.Label>Ingrese una fecha</Form.Label>
            <div className="date-input">
              <Form.Control
                type="text"
                placeholder="DD/MM/YY"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              <CalendarIcon onDateSelect={handleDateSelect} />
            </div>
          </Form.Group>
          <Form.Group controlId="cursoInteres">
            <Form.Label>Curso de interés:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el curso de interés"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" text="Buscar horarios disponibles" />
        </Form>
      </div>

      {selectedDate && selectedCourse && (
        <div className="available-schedule">
          <h4>Horarios disponibles para el {selectedDate}:</h4>
          <div className="schedule-slots">
            {/* Aquí puedes generar dinámicamente los horarios disponibles */}
            <div className="schedule-slot">9:00 AM</div>
            <div className="schedule-slot">10:00 AM</div>
            <div className="schedule-slot">11:00 AM</div>
            {/* ... */}
          </div>
        </div>
      )}
    </div>
  );
};
    
export default reservarcitas;