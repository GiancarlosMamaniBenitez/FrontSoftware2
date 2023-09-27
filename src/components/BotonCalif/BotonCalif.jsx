import './style.css'
import '../../../public/star-filled.png'
import '../../../public/star-empty.png'
import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import ModalCalif from '../../components/ModalCalif/ModalCalif.jsx'

const BotonCalif = ({}) => {


const [modalShow, setModalShow] = useState(false);
  return (
    <>
    <Button variant="primary" onClick={() => setModalShow(true) } className='Bt'>
    Calificar
  </Button>

  <ModalCalif
    show={modalShow}
    onHide={() => setModalShow(false)}
  />
  </>
  )

}

export default BotonCalif