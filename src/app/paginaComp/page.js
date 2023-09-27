'use client';

'use client';

import React from 'react';


import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import { Button } from 'react-bootstrap';
import PersonaApi from '@/api/persona.js'

import TabContent from 'react-bootstrap/TabContent';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TabContainer from 'react-bootstrap/TabContainer';
import TabPane from 'react-bootstrap/TabPane';
import Nav from 'react-bootstrap/Nav';

import Chip from '../../components/ChipG/ChipG.jsx'
import './styles.css'


const RenderTabBar = ({
        
            usuario,
            setUsuario,
            presentacion,
            setPresentacion,
            textBusqueda1,
            setTextBusqueda1,
            textBusqueda2,
            setTextBusqueda2,
            textBusqueda3,
            setTextBusqueda3,
            arr1=[],
            arr2=[],
            arr3=[],
            }) =>{

          const handleTituloChange=(e)=> {
            setPresentacion({ ...presentacion, titulo: e.target.value });
            }
        
            const handlePresentacionChange=(e)=> {
            setPresentacion({ ...presentacion, presentacion: e.target.value });
            }
            const handleUniversidadChange=(e)=> {
                setTextBusqueda1(e.target.value);
                
                
            }
            const handleCarreraChange=(e)=>{
                setTextBusqueda2(e.target.value);

            }
            const handleCursoChange=(e)=>{
                setTextBusqueda3(e.target.value);

            }


      return (
        <TabContainer defaultActiveKey="datosUsuario" id="fill-tab-example" className="mb-3" fill>
          <Nav variant="tabs" className="mb-3">
            <Nav.Item>
              <Nav.Link eventKey="datosUsuario">Datos de Usuario</Nav.Link>
            </Nav.Item>
  
            <Nav.Item>
              <Nav.Link eventKey="universidad">Universidad</Nav.Link>
            </Nav.Item>
  
            <Nav.Item>
              <Nav.Link eventKey="presentacion">Presentación</Nav.Link>
            </Nav.Item>
          </Nav>
  
          <Tab.Content>
            <Tab.Pane eventKey="datosUsuario">
              <div>
                <Form.Label htmlFor="usuario">Usuario</Form.Label>
                <Form.Control
                  type="text"
                  id="usuario"
                  value={usuario.usuario}
                  onChange={(e) =>
                    setUsuario({ ...usuario, usuario: e.target.value })
                  }
                />
  
                <Form.Label htmlFor="constraseñaActual">Contraseña Actual</Form.Label>
                <Form.Control
                  type="password"
                  id="constraseñaActual"
                  value={usuario.constraseñaActual}
                  onChange={(e) =>
                    setUsuario({ ...usuario, constraseñaActual: e.target.value })
                  }
                />
  
                <Form.Label htmlFor="nuevaContraseña">Nueva Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  id="nuevaContraseña"
                  value={usuario.nuevaContraseña}
                  onChange={(e) =>
                    setUsuario({ ...usuario, nuevaContraseña: e.target.value })
                  }
                />
  
                <Form.Label htmlFor="repetirContraseña">Repetir Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  id="repetirContraseña"
                  value={usuario.repetirContraseña}
                  onChange={(e) =>
                    setUsuario({ ...usuario, repetirContraseña: e.target.value })
                  }
                />
              </div>
            </Tab.Pane>
  
            <Tab.Pane eventKey="universidad">
              <div>
                {
                    <div>
                    <div>
                        <Form.Control 
                            type="text"
                            id="universidad"
                            value={textBusqueda1}
                            onChange={handleUniversidadChange}
                        ></Form.Control>
                        <ul className="nobullets">
                                    { arr1.filter(f => f.includes(textBusqueda1))
                                        .map(universidad =>{
                                        return(<li key={universidad} >
                                            <Chip text={universidad} />
                                            </li>);
                                    }) } 
                                </ul>
                        
                    </div>

                    <div>
                        <Form.Control 
                            type="text"
                            id="universidad"
                            value={textBusqueda2}
                            onChange={handleCarreraChange}
                        ></Form.Control>
                        <ul className="nobullets">
                                    { arr2.filter(f => f.includes(textBusqueda2))
                                        .map(carrera =>{
                                        return(<li key={carrera} >
                                            <Chip text={carrera} />
                                            </li>);
                                    }) } 
                                </ul>
                        
                    </div>

                    <div>
                        <Form.Control 
                            type="text"
                            id="universidad"
                            value={textBusqueda3}
                            onChange={handleCursoChange}
                        ></Form.Control>
                        <ul className="nobullets">
                                    { arr3.filter(f => f.includes(textBusqueda3))
                                        .map(curso =>{
                                        return(<li key={curso} >
                                            <Chip text={curso} />
                                            </li>)
                                    }) } 
                                </ul>
                        
                    </div>

                </div>
                }
              </div>
            </Tab.Pane>
  
            <Tab.Pane eventKey="presentacion">
              <div>
                <Form.Label htmlFor="titulo">Titulo</Form.Label>
                <Form.Control
                  type="text"
                  id="titulo"
                  value={presentacion.titulo}
                  onChange={handleTituloChange}
                />
  
                <Form.Label htmlFor="presentacion">Presentación</Form.Label>
                <Form.Control
                  type="text"
                  id="presentacion"
                  value={presentacion.presentacion}
                  onChange={handlePresentacionChange}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </TabContainer>
      );
    }
  




const paginaComp=()=>{

    
    
    const [showDatosPersona, setShowDatosPersona ] = useState(true)
    const defaultPersona = {
        nombres: "",
        apellidos: "",
        tipodocumento: "",
        numero: "",
        rol: ""
    }
    const [persona, setPersona] = useState(defaultPersona)


    const [showDatosUsuario, setShowDatosUsuario ] = useState(true)
    const defaultUsuario = {
        usuario:"",
        constraseñaActual:"",
        nuevaContraseña:"",
        repetirContraseña:""
    }
    const [usuario, setUsuario] = useState(defaultUsuario)

    const universidad =["ulima", "pucp", "up", "unmsm", "uni", "usmp"]
    const [arr1,setArr1] = useState(universidad)
    const [textBusqueda1, setTextBusqueda1] = useState("")

    const carrera = ["informatica", "software", "cienciaComp", "sistemas"]
    const [arr2,setArr2] = useState(carrera)
    const [textBusqueda2, setTextBusqueda2] = useState("")

    const curso = ["prograWeb", "SistOpe", "Lp", "ArqSoft"]
    const [arr3,setArr3] = useState(curso)
    const [textBusqueda3, setTextBusqueda3] = useState("")

    const [showPresentacion, setShowPresentacion] = useState(true)
    const defaultPresentacion = {
        titulo:"",
        presentacion:""
    }
    const [presentacion, setPresentacion]=useState(defaultPresentacion)

    const handleDatosPersonaChange = () => {
      PersonaApi.save(persona)
      const personas = PersonaApi.getAll()
      console.log(personas)
    }

    const handleDatosUsuarioChange = ()=>{
        PersonaApi.save(usuario)
        const usuarios = PersonaApi.getAll()
        console.log(usuarios)
    }

    const handlePresentacionChange =()=>{
        PersonaApi.save(presentacion)
        const presentaciones = PersonaApi.getAll()
        console.log(presentaciones)
    }

    const basedatosPerfil=JSON.parse(localStorage.getItem('loggedIn'))

    const [activeTab, setActiveTab] = useState("datosUsuario");
    const handleTabSelect = (key) => {
        setActiveTab(key);
      };

    
    

    return(
        
        <div>
            <div>
                <div>
                    <h3>MI PERFIL</h3>
                    <div>
                    <Button onClick={() => handleDatosPersonaChange()}>GUARDAR</Button>
                    </div>
                </div>

                <div>
                    <h3>Información Personal</h3>
                    <Form.Label htmlFor="Nombres">Nombres</Form.Label>
                    <Form.Control type="text" id="Nombres"
                        value={persona.nombres}
                        onChange={e => setPersona({...persona, nombres: e.target.value})}/>

                    <Form.Label htmlFor="Apellidos">Apellidos</Form.Label>
                    <Form.Control type="text" id="Apellidos"
                        value={persona.apellidos}
                        onChange={e => setPersona({...persona, apellidos: e.target.value})}/>

                    <Form.Label htmlFor="Tipo de documento">Tipo de documento</Form.Label>
                    <Form.Control type="text" id="Tipo de documento"
                        value={persona.tipodocumento}
                        onChange={e => setPersona({...persona, tipodocumento: e.target.value})}/>
              
                    <Form.Label htmlFor="Numero">Numero</Form.Label>
                    <Form.Control type="text" id="Numero"
                        value={persona.numero}
                        onChange={e => setPersona({...persona, numero: e.target.value})}/>

                    <Form.Label htmlFor="Rol">rol</Form.Label>
                    <Form.Control type="text" id="Rol"
                        value={persona.rol}
                        onChange={e => setPersona({...persona, rol: e.target.value})}/>

                </div>
            
              

              
                
            </div>
            <div>
                <p>------------------------------------------------------------</p>
                <h3>Contenido de la página principal</h3>

                {<RenderTabBar
          usuario={usuario}
          setUsuario={setUsuario}
          presentacion={presentacion}
          setPresentacion={setPresentacion}
          textBusqueda1={textBusqueda1}
        setTextBusqueda1={setTextBusqueda1}

        textBusqueda2={textBusqueda2}
        setTextBusqueda2={setTextBusqueda2}

        textBusqueda3={textBusqueda3}
        setTextBusqueda3={setTextBusqueda3}
        arr1={arr1}
        arr2={arr2}
        arr3={arr3}
        />}
            </div>
          
        </div>
    )
}

export default paginaComp;