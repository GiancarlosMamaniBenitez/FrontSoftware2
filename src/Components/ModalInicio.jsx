import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LimitgastoApi from '@/app/api_fronted/Limitgasto';
import MetaApi from '@/app/api_fronted/meta';
import React, { useState, useEffect } from "react";
import selectedCard from "@/app/Ingreso/page.js"
import { useRouter } from 'next/navigation';
import stylesModal from "@/Components/stylesModal.css";
import { ModalBody, ModalDialog, ModalFooter, ModalHeader } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

function ModalInicio({ closeModal, monto123, limite456 }) {
    /*const [sesion , setSesion] = useState([]);
    const [listMetas, setListMetas] = useState([]);
    const [metaUsuario, setMetaUsuario] = useState(0);
    const {sesion1}=sesionId;
    const LoadData = async () => {
        
      
        const result6 = await MetaApi.findAll()
        
        setListMetas(result6.data)
  
    
    
      }
      useEffect(() => {

        LoadData()
        getsesionMeta()
        handleOnLoad()
        
      }, []);
      let sesionGuardada = localStorage.getItem("sesion");
      console.log("sesion guardada",sesionGuardada);
      useEffect(() => {
        // Verifica si el usuario ha iniciado sesión
        let sesionGuardada = localStorage.getItem("sesion");
            
            setSesion(JSON.parse(sesionGuardada))
            
              
              
              
            
            console.log(sesionId)

      }, []);
      const handleOnLoad = () => {

        let sesionGuardada = localStorage.getItem("sesion");
        setSesion(JSON.parse(sesionGuardada))
        console.log("sesionId handle",sesion.id)
    
      }
      const metaAplanado = listMetas.flat();
      const getsesionMeta =  () =>{
            const meta = listMetas.find((e) => e.id_usuario === sesion.id);
            console.log("meta log",meta);
            if (meta) {
       
                setMetaUsuario(meta.monto);
                
                
                
              }
              console.log("meta log",meta);

      }
      
      
      console.log("lista meta",metaAplanado);
      console.log("meta Usuario",metaUsuario);
      console.log("log id",sesionId)
      console.log("log id",sesion1)*/
      
    
      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  return (
    <div className={stylesModal.overlay}>
    <Button variant="primary" onClick={handleShow}>
      Launch demo modal
    </Button>
    <ModalDialog>
      <ModalHeader>
        <h1>Bienvenido al Sitio</h1>
      </ModalHeader>
      <div className={stylesModal.modal}>
        <ModalBody>
          <p>Contenido del modal...</p>
          <h1>Meta de Ahorro: {monto123} Nuevos Soles</h1>
          <h1>Limite de Gasto: {limite456} Nuevos Soles</h1>
                  
        </ModalBody>
        <ModalFooter>
          <button className="botonModal" onClick={closeModal}>
            Cerrar
          </button>
        </ModalFooter>
      </div>
    </ModalDialog>
    
  </div>
  );
}

export default ModalInicio;