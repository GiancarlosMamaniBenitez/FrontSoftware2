import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import TarjetaVisa from "../../../imagenes/TarjetaVisa.png";

function ButtonsTarjeta() {
  return (
    <>
      <div>
      <img src="../../../imagenes/TarjetaVisa.png" alt="Imagen 1" />
      <Button variant="primary">
        Primary</Button>{' '}
      </div>
      <div>
      <img src={TarjetaVisa} alt="" />

      
      </div>
      <Button variant="secondary">Secondary</Button>{' '}
      <Button variant="success">Success</Button>{' '}
      <Button variant="warning">Warning</Button>{' '}
      <Button variant="danger">Danger</Button>{' '}
      <Button variant="info">Info</Button>{' '}
      <Button variant="light">Light</Button>{' '}
      <Button variant="dark">Dark</Button>
      <Button variant="link">Link</Button>
    </>
  );
}

export default ButtonsTarjeta;