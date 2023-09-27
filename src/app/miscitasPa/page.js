'use client'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './page.modul.css'
import Chip from '../../components/Chip/Chip.jsx'
import { useState } from 'react'
import { useEffect } from 'react';
import BotonCalif from '@/components/BotonCalif/BotonCalif'
import citasAn from '../../api/citasAn'
import '../../../public/star-filled.png'

const pDocentes = () => {


    var loggedIn = JSON.parse(localStorage.getItem('loggedIn'))
    const arr = citasAn.getAll();

    return(
        <div>
        {(loggedIn.role == "alumno") ? 
      <div className='welcome'>
      <p className='welcome-text'>¡Mis Citas Pasadas!</p>
      <div className='welcome-line'></div>
      <div className='block-citas'>
          <p>Citas Anteriores</p>
          <div className='citas'>
                    {
                        arr.map(citas=>{
                            return (<div className='fr' key={citas}><Chip text={citas.nombre} fecha={citas.fecha}/> <BotonCalif/>
                            <div className='calif'><a>{citas.calificacion}<img src={'star-filled.png'} className='img'/></a></div></div>)
                        })
                    }
          </div>
      
        </div>
        <div className='espacio'></div>
        

  </div> 
    :
    <div className='welcome'>
      <p className='welcome-text'>¡Mis Citas Pasadas!</p>
      <div className='welcome-line'></div>
      <div className='block-citas'>
          <p>Citas Anteriores</p>
          <div className='citas'>
                    {
                        arr.map(citas=>{
                            return (<div className='fr' key={citas}><Chip text={citas.nombre} fecha={citas.fecha}/> <BotonCalif/>
                            <div className='calif'><a>{citas.calificacion}<img src={'star-filled.png'} className='img'/></a></div></div>)
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


