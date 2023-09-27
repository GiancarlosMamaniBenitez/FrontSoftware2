import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './style.css'
import '../../../public/star-filled.png'
import '../../../public/star-empty.png'
import React, { useState } from 'react';

function MyVerticallyCenteredModal(props) {
  const [calificacion, setCalificacion] = useState(0);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  const handleCalificar = (rating) => {
    setCalificacion(rating);
    setMostrarMensaje(true);
  };

  const handleCloseMensaje = () => {
    setMostrarMensaje(false);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Calificacion
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="calificar-container">
      <div>
      <h2>Calificar</h2>
      <div>
        {[1, 2, 3, 4, 5].map((rating) => (
          <img
            key={rating}
            src={rating <= calificacion ? 'star-filled.png' : 'star-empty.png'}
            alt={`Calificación ${rating}`}
            onClick={() => handleCalificar(rating)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </div>
      {mostrarMensaje && (
        <div>
          <p>Gracias por calificar con {calificacion} estrellas.</p>
          <button onClick={handleCloseMensaje}>Cerrar</button>
        </div>
      )}
    </div>
    </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} >Submit</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MyVerticallyCenteredModal