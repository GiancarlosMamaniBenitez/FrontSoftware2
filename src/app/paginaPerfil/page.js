'use client';
import PersonasApi from '../api/personas.js';
import CarrerasApi from '../api/carreras.js';
import CursosApi from '../api/cursos.js';
import UniversidadesApi from '../api/universidades.js';
import axios from 'axios';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo.jsx';
import UserData from '../../components/UserData/UserData.jsx';
import University from '../../components/University/University.jsx';
import Presentation from '../../components/Presentation/Presentation.jsx';
import './styles.css'
import { Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import React, { useEffect, useState } from 'react';


import { Modal } from 'react-bootstrap';

const paginaPerfil = () => {
  const personaDefault = {idPersona:"",nombre:"",apellido:"",tipoDocumento:"",
  dni:"",idrol:"",email:"",contraseña:"",idCarrera:"",titulopresentacion:"",presentacion:"",grado:""}

  const rolDefault = {idRol:"",descripcion:""}
  const carreraDefault = {idCarrera:"",nombre:"",idUniversidad:""}
  const universidadDefault = {idUniversidad:"",descripcion:""}
  const cursoDefault = {idCurso:"",idUniversidad:"",nombre:""}
  const personaCursoDefault = {idPersonaCurso:"",idPersona:"",idCurso:""}

  const[personas, setPersonas] = useState([])
  const[persona, setPersona]=useState(personaDefault)
  const[roles, setRoles] = useState([])
  const[rol, setRol]=useState(rolDefault)
  const[universidades, setUniversidades] = useState([])
  const[universidad, setUniversidad]=useState(universidadDefault)
  const[cursos, setCursos] = useState([])
  const[curso, setCurso]=useState(cursoDefault)
  const[carreras, setCarreras] = useState([])
  const[carrera, setCarrera]=useState(carreraDefault)
  const[personasCursos, setPersonasCursos] = useState([])
  const[personaCurso, setPersonaCurso]=useState(personaCursoDefault)
  const [isFormVisible, setIsFormVisible ] = useState(false)
  const [ isNew, setIsNew ] = useState(true)
  const [ alertData, setAlertData ] = useState({ isVisible: false, message: '', variant: 'success'})


  useEffect(() => {
  const fetchUniversidades  = async () => {
    /*const result = await PersonasApi.findAll();
    setPersonas(result.data);*/


    try {
      
      const personasResponse = await PersonasApi.findAll();
      const personasData = personasResponse.data;
      setPersonas(personasData);
      

      if (personasData.length > 0) {
        const firstPersona = personasData[0];
        setPersona({
          ...persona,
          titulopresentacion: firstPersona.titulopresentacion,
          presentacion: firstPersona.presentacion
        });
      }
      const universidadesResponse = await UniversidadesApi.findAll();
      const universidadesData = universidadesResponse.data;
      setUniversidades(universidadesData);
      } catch (error) {
        console.error(error);
      }
    };
  fetchUniversidades();
 
  }, []) ;
  

  const handleGuardarDatosPersona = async (persona) => {
    if (isNew)
        await PersonasApi.create(persona);
    else
        await PersonasApi.update(persona);
    
    handleOnLoad();
    setAlertData({...alertData, isVisible: true, message:'Datos guardados exitosamente.'})
    handleCancelarDatosPersona();
  }
  const handleCancelarDatosPersona = () => {
    setIsFormVisible(false);
  }

  /*const [persona, setPersona] = useState({
    nombres: '',
    apellidos: '',
    tipodocumento: '',
    numero: '',
    rol: ''
  });*/

  const [usuario, setUsuario] = useState({
    usuario: '',
    constraseñaActual: '',
    nuevaContraseña: '',
    repetirContraseña: ''
  });

  const [presentacion, setPresentacion] = useState({
    titulo: '',
    presentacion: ''
  });


  //const universidad =["ulima", "pucp", "up", "unmsm", "uni", "usmp"]
  /*const universidad1 = persona.idCarrera.idUniversidad.descripcion
    const [arr1,setArr1] = useState(universidad1)
    const [textBusqueda1, setTextBusqueda1] = useState("")*/


    /*const universidad1 = persona && persona.idCarrera && persona.idCarrera.idUniversidad ? persona.idCarrera.idUniversidad.descripcion : '';
const [arr1, setArr1] = useState(universidad1);
const [textBusqueda1, setTextBusqueda1] = useState('');*/

//const universidad1 = universidades.find((u) => u.idUniversidad === persona.idCarrera.idUniversidad)?.descripcion || '';
const universidadArr = personas.map((persona) => persona?.idCarrera?.idUniversidad?.descripcion || "");

const [arr1, setArr1] = useState(universidadArr );
const [textBusqueda1, setTextBusqueda1] = useState("");

  //const carrera = ["informatica", "software", "cienciaComp", "sistemas"]
  //const carrera1 = persona.idCarrera.nombre
  const carreraArr = personas.map((persona) => persona.idCarrera.nombre);
    const [arr2,setArr2] = useState(carreraArr)
    const [textBusqueda2, setTextBusqueda2] = useState("")


  
  /*const curso1 = persona.idPersona.idCurso.nombre
  //const curso = ["prograWeb", "SistOpe", "Lp", "ArqSoft"]
    const [arr3,setArr3] = useState(curso)
    const [textBusqueda3, setTextBusqueda3] = useState("")*/
    //const curso1 = persona && persona.idPersona && persona.idPersona.idCurso ? persona.idPersona.idCurso.nombre : '';
    const cursoArr = personas.map((persona) => persona.idPersona?.idCurso?.nombre || '');


    const [arr3, setArr3] = useState(cursoArr);
    const [textBusqueda3, setTextBusqueda3] = useState('');
    
    const handleUniversidadChange = (e) => {
      setTextBusqueda1(e.target.value);
    };
    const handleCarreraChange=(e)=>{
      setTextBusqueda2(e.target.value);

  }
  const handleCursoChange=(e)=>{
      setTextBusqueda3(e.target.value);

  }

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    handleCloseModal();
  };

  return (
    <div className="contenedorSecundario">

      <div className="cabeceraPerfil">
              <h3 className="tituloPerfil">MI PERFIL</h3>
              <Button className="botonCancelar" onClick={() => handleCancelarDatosPersona() }>CANCELAR</Button>
              <Button className="botonGuardar" onClick={() => handleGuardarDatosPersona() }>GUARDAR</Button>
      </div>
      <div className="InfoPersonal">
        
        <PersonalInfo className="DatosPersona" 
          
          persona={persona}
          setPersona={setPersona}
          nombre={persona.nombre}
          apellido={persona.apellido}
          tipoDocumento={persona.tipoDocumento}
          numeroDocumento={persona.dni}
          idRol={persona.idrol} />

        <div className="profile-name">
              <div className="profile-image-container">
                {selectedImage ? (
                  <img src={selectedImage} alt="Mi Imagen" className="profile-image" />
                ) : (
                  <img src="https://www.ulima.edu.pe/sites/default/files/styles/600x300/public/news/img/agenda-2-foromejoracontinua-may2022_0.jpg?itok=Z3bSJtG3" alt="Mi Imagen" className="profile-image" />
                )}
              </div>
              <Button onClick={handleOpenModal}>Adjuntar imagen</Button>

              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Adjuntar imagen</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input type="file" onChange={handleImageUpload} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>
                    Cancelar
                  </Button>
                  <Button variant="primary" onClick={handleSave} disabled={!selectedImage}>
                    Guardar
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>


      </div>

      <div className="DatosSecundarios">
        
        <Tab.Container defaultActiveKey="userData">
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="userData">User Data</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="university">University</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="presentation">Presentation</Nav.Link>
            </Nav.Item>
          </Nav>
          
          
            {personas.map((persona) => (
              <Tab.Pane key={persona.idPersona} eventKey={`userData-${persona.idPersona}`}>
                <UserData className="userData1" usuario={usuario} setUsuario={setUsuario} persona={persona} />

              </Tab.Pane>
            ))}

              

            <Tab.Pane eventKey="university">
            <University universidades={universidades} carreras={carreras} cursos={cursos} />
            </Tab.Pane>
            <Tab.Pane eventKey="presentation">
              <Presentation presentacion={presentacion}
                    setPresentacion={setPresentacion}
                    tituloPresentacion={persona.titulopresentacion}
                    presentacionPersona={persona.presentacion} />
            </Tab.Pane>
          
        </Tab.Container>
      </div>
    </div>
  );
};

export default paginaPerfil;
