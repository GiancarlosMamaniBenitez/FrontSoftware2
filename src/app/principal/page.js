'use client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './page.modul.css'
import ChipA from '../../components/ChipOriginal/ChipO.jsx'
import { useState } from 'react'
import { useEffect } from 'react';
import BotonCalif from '@/components/BotonCalif/BotonCalif'

import citasAc from '../api/citas.js'

import FilterNames from '@/components/FilterNames/FilterNames'

const pDocentes = () => {
    const citaDefault = {id: 1,
    idPersonaDocente: 0, 
    idPersonaAlumno: 0, 
    Fecha: "", 
    horainicio: "", 
    horafin:"", 
    enlaceSesion:"https://www.flaticon.es/icono-gratis/enlace_1063309", 
    estado:"", 
    idCurso: 0}
    const [ citas, setCitas ] = useState([])
    const [ cita, setCita ] = useState(citaDefault)
    var loggedIn = JSON.parse(localStorage.getItem('loggedIn'))

    const handleOnLoad = async () => {
        const arr = await citasAc.findAll(citaDefault);
        setCitas(arr.data);
    }
    useEffect(() => {
        handleOnLoad();
    }, [])

    return(
    <div>
        {(loggedIn.role == "alumno") ? 
      <div className='welcome'>
      <p className='welcome-text'>¡Bienvenido , {loggedIn.nombre}!  </p>
      <div className='welcome-line'></div>
      <div className='block-citas'>

          <p>Proximas Citas</p>
          <div className='citas'>
                  {
                      citas.map(citas=>{
                          return (<div className='fr' key={citas.id}><ChipA inicial={citas.estado} nombre={citas.estado} fecha={citas.Fecha}/> </div>)
                      })
                  }
          </div>
      
        </div>
        <div className='espacio'></div>
        

    </div> 
    :
    <div className='welcome'>
    <p className='welcome-text'>¡Bienvenido , Profesor {loggedIn.nombre}!  </p>
    <div className='welcome-line'></div>
    <div className='block-citas'>
        <p>Proximas Citas</p>
        <div className='citas'>
                  {
                      citas.map(citas=>{
                          return (<div className='fr' key={citas.id}><ChipA inicial={citas.estado} nombre={citas.estado} fecha={citas.Fecha}/> </div>)
                      })
                  }
        </div>
    
      </div>
      
      <div className='espacio'></div>
      

</div> 
}
    </div>
    
    )
} 

export default pDocentes


