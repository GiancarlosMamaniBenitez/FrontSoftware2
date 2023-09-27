'use client'

import Button from '../../components/Button/Button.jsx';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useEffect } from 'react'
import PersonasApi from "../api/personas";
import RolesApi from '../api/roles.js';

const Registro = () => {

  const personaDefault = { nombre: '', apellido: '', tipoDocumento: "DNI", numeroDocumento: 0, idRol: 0, email: '', contraseña:'', idCarrera:1, tituloPresentacion: "Coloca un titulo para tu presentacion", presentacion: "Coloca aqui tu presentacion", foto: ''}

  const [errorIn, setErrorIn] = useState("");
  const [persona, setPersona] = useState(personaDefault)
  const [personas, setPersonas]= useState([])
  const [roles, setRoles] = useState([])

  const handleOnLoad = async () =>{
    const result = await PersonasApi.findAll()
    setPersonas(result.data)
    const result2 = await RolesApi.findAll()
    setRoles(result2.data)
  }

  localStorage.setItem('loggedIn', null)

  const handleRegistro = async (event) =>{
    event.preventDefault()

    var email= document.getElementById('EmailR'); 
    var pass = document.getElementById('PasswordR');
    var passC = document.getElementById('PasswordConfirmR');
    var tipoDoc= document.getElementById('TipoDocR');
    var nDoc= document.getElementById('NroDocR');

    const notNewUserData = personas.find((user) => user.email === email.value)

    if (notNewUserData) {
        setErrorIn("email");
      } else {

        if (passC.value !== pass.value) {
            setErrorIn("passC");
          } else {
            if (((tipoDoc.value) == "DNI") && ((nDoc.value).length) != 8){
                setErrorIn("docLength")
              }else{
              if(((tipoDoc.value) == "Pasaporte") || ((tipoDoc.value) == "Carnet Extranjero") && ((nDoc.value).length) != 12){
                setErrorIn("docLength")
              }else{
            
            setErrorIn("");

            console.log(persona)

            await PersonasApi.create(persona)
            window.location.href = "/login"
            
            }
          }
        }
      }

      
    
  }

  useEffect(() => {
    handleOnLoad();
  }, [])

    return (
        <div>
        <Form onSubmit={handleRegistro}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="EmailR">
          <Form.Label>Correo electronico</Form.Label>
          <Form.Control type="text" placeholder="|" required id="EmailR"
          value = {persona.email}
          onChange={e => setPersona({...persona, email: e.target.value})}/>
          {(errorIn=="email") ? <div>el usuario o email ya existe</div>:""}
        </Form.Group>

        <Form.Group as={Col} controlId="PasswordR">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="|" id="PasswordR"
          value = {persona.contraseña}
          onChange={e => setPersona({...persona, contraseña: e.target.value})}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="space">
        </Form.Group>
        <Form.Group as={Col} controlId="PasswordConfirmR">
          <Form.Label>Ingrese Password nuevamente</Form.Label>
          <Form.Control type="password" placeholder="|" id="PasswordConfirmR"/>
          {(errorIn=="passC") ? <div>Las contraseñas no coinciden</div>:""}
        </Form.Group>
      </Row>


      <h6>Datos personales</h6>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="NombreR">
          <Form.Label>Nombres</Form.Label>
          <Form.Control type="text" placeholder="|" required id="NombreR"
          value = {persona.nombre}
          onChange={e => setPersona({...persona, nombre: e.target.value})}/>
        </Form.Group>

        <Form.Group as={Col} controlId="ApellidosR">
          <Form.Label>Apellidos</Form.Label>
          <Form.Control type="text" placeholder="|" required id="ApellidosR"
          value = {persona.apellido}
          onChange={e => setPersona({...persona, apellido: e.target.value})}/>
        </Form.Group>
      </Row>
      <Row className="mb-3">
      <Form.Group as={Col} controlId="TipoDocR">
      <Form.Label>Tipo de documento</Form.Label>
      <Form.Select aria-label="Default select example"
                    value={persona.tipoDocumento}
                    onChange={e => setPersona({...persona, tipoDocumento: e.target.value})}>
                    <option value="DNI">DNI</option>
                        <option value="Carnet Extranjero" key="Carnet Extranjero">Carnet Extranjero</option>
                        <option value="Pasaporte" key="Pasaporte">Pasaporte</option>
                </Form.Select>
      </Form.Group>

        <Form.Group as={Col} controlId="NroDocR">
          <Form.Label>Nro de documento</Form.Label>
          <Form.Control type="text" placeholder="|" required id ="NroDocR"
          value = {persona.numeroDocumento}
          onChange={e => setPersona({...persona, numeroDocumento: e.target.value})}/>
          {(errorIn=="docLength") ? <div>El tipo de documento y la cantidad de numeros no coinciden</div>:""}
        </Form.Group>
      </Row>
      <Row className="mb-3">
        
        <Form.Group as={Col} controlId="RoleR">
          <Form.Label>Rol</Form.Label>
          <Form.Select aria-label="Default select example"
                    value={persona.idRol}
                    onChange={e => setPersona({...persona, idRol: e.target.value})}>
                    <option value="0">Rol</option>
                    { roles.map(item => (
                        <option value={item.id} key={item.id}>{item.descripcion}</option>                 
                    ))}
                </Form.Select>
        </Form.Group>
        <Form.Group as={Col} controlId="space">
        </Form.Group>
      </Row>
      

      <Button variant="primary" type="submit" text ="Registrar"></Button>
    </Form>
    </div>
    )
}

export default Registro