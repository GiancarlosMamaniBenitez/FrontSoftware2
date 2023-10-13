'use client'

import './perfil.css';
import ProgressBar from '../../components/ProgressBar.jsx';
import Range from '../../components/Range.jsx';
import { useState } from 'react';
import MenuNuevo from '../MenuNuevo';

function DatosdePerfil() {

    const [newNombre, setNewNombre] = useState("")
    const [newApellido, setNewApellido] = useState("")
    const [newDNI, setNewDNI] = useState(0)
    const [newTelefono, setNewTelefono] = useState(0)
    const [newCorreo, setNewCorreo] = useState("")
    const [newPais, setNewPais] = useState("")
    const [newCiudad, setNewCiudad] = useState("")
    const [newDireccion, setNewDireccion] = useState("")
    const [newCodigoPostal, setNewCodigoPostal] = useState("")

 

    const onSubmitDatos =  () => {
        
    }

    
    return (
        <div className="contenido">
           <div className="col-2">
                {/* Agregamos el VerticalMenu */}
                
                <MenuNuevo>
                    
                </MenuNuevo>
            </div>
            
        
            <div className="row ">
                <div className="col-10">
                    <div className="col h2 text-center">  
                        DATOS DE PERFIL
                        <img src="" alt="" className='col'/>
                    </div>
                    <br/><br/>
                    <div>
                        <div className="row h3">
                            Datos Obligatorios
                        </div>
                        <br/><br/>
                        <div className='row'>
                            <div className='col'>
                                <div className='col ms-4'>
                                    Nombre:
                                </div>
                                <input 
                                type="Ingresar nombre" 
                                className='ms-4 form-control rounded'
                                onChange={(e)=> setNewNombre(e.target.value)}/>
                            </div>
                            <div className='col'>
                                <div className='ms-4'>
                                    Apellido:
                                </div>
                                <input 
                                type="Ingresar apellido" 
                                className='ms-4 form-control rounded'
                                onChange={(e)=> setNewApellido(e.target.value)}/>
                            </div>
                        </div>
                        <br/><br/> 
                        <div className='row'>
                            <div className='col'>
                                <div className='ms-4'>
                                    DNI:
                                </div>
                                
                                <input type="Ingresar DNI" 
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewDNI(Number(f.target.value))}/>
                            </div>
                            <div className='col'>
                                <div className='ms-4'>
                                    Celular:
                                </div>
                                
                                <input type="Ingresar celular" 
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewTelefono(Number(f.target.value))}/>
                            </div>
                        </div>
                        <br/><br/>
                        <div className='row'>
                            <div className='col'>
                                <div className='ms-4'>
                                    Correo:
                                </div>

                                <input type = "Ingresar correo"
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewCorreo(f.target.value)}/>
                            </div>
                        </div>
                        <br/><br/>
                        <div className='row'>
                            <div className='col'>
                                <div className='ms-4'>
                                    Pais:
                                </div>

                                <input type = "Ingresar Pais"
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewPais(f.target.value)}/>
                            </div>
                            <div className='col'>
                                <div className='ms-4'>
                                    Ciudad:
                                </div>

                                <input type = "Ingresar ciudad"
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewCiudad(f.target.value)}/>
                            </div>
                            <br/><br/>
                            <div className='row'>
                              <div className='col'>
                                <div className='ms-4'>
                                    Dirección:
                                </div>

                                <input type = "Ingresar Dirección"
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewDireccion(f.target.value)}/>
                            </div>
                            <div className='col'>
                                <div className='ms-4'>
                                    Codigo Postal:
                                </div>

                                <input type = "Ingresar codigoPostal"
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewCodigoPostal(Number(f.target.value))}/>
                            </div>
                        </div>        
                        </div>        
                    </div>
                </div>
                <div className='col-2 d-flex flex-row-reverse align-items-center'>
                    
                        <button className='btn btn-primary align-middle' 
                        type='button'
                        onClick={()=> {onSubmitDatos();
                        }}>
                            EDITAR DATOS
                        </button>
                </div>
            </div>

            <br/>
            <div className='col-1 d-flex flex-row-reverse align-items-center'>
                    
                        <button className='btn btn-primary align-middle' 
                        type='button'
                        onClick={()=> {onSubmitDatos();
                        }}>
                            GUARDAR DATOS
                        </button>
                </div>
            
        </div>
      );
    }
    
    export default DatosdePerfil;
