import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import RenderTabBar from './RenderTabBar';
import ChipG from './ChipG';

const PaginaComp=()=>{

    
    
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

export default PaginaComp;