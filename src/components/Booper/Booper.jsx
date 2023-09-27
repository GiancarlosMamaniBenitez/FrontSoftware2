import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import Popover from 'react-bootstrap/Popover';
import '../../../public/Perfil.png'
import '../Booper/style.css'

function Booper() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const handleClick3 = () => {
    window.location.href = "/login"
  }
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  var loggedIn = JSON.parse(localStorage.getItem('loggedIn'))

  return (
    <div ref={ref}>
      <Button onClick={handleClick}><img src={'Perfil.png'} className='img'/></Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Header as="h3" className='h3'>{loggedIn.nombre}</Popover.Header>
          <Popover.Body>
            <Button onClick={handleClick3}>Cerrar Sesion</Button>
          </Popover.Body>
        </Popover>
      </Overlay>
    </div>
  );
}

export default Booper;