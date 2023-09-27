'use client';
import { useEffect, useState } from 'react'
import Cards from '../../components/Cards/Cards.jsx'
import Button from 'react-bootstrap/Button';
import AlumnoApi from '@/api/alumno.js';
import styles from './page.modul.css';

function CitasProfesor() {
    
    const arr = AlumnoApi.getAll();

    function BotonCancelar(arr, index){
        arr.splice(index,1);
    }

    if(arr.length!=0){
        return(
            <div class="todo">
                <h1 class="letra">Mis citas</h1>
                <a class="btn btn-primary" href="#" id="Boton">Programar cita</a>
                <a class="btn btn-primary" href="#" id="Boton">Citas pasadas</a>   
                <h5 class="letra">Citas de asesorias reservadas</h5>
                <div class="contenedor">
                {
                    arr.map ((elemento) => (
                        <div class="card">
                        <Cards
                            imagen = {elemento.imagen}
                            nombre = {elemento.nombre}
                            titulo = {elemento.titulo}
                            fecha = {elemento.fecha}
                            curso = {elemento.curso}
                            link = {elemento.link}
                        /><Button variant="danger">Cancelar</Button>
                        </div>
                    ))
                }
                </div>
            </div>
        )
    }else{
        return(
            <div>
                <h1 class="letra">Mis citas</h1>
                <h3 class="letra">Actualmente no tiene citas de asesorias reservadas</h3>
                <a class="btn btn-primary" href="#">Programar cita</a>  
            </div>
        )
    }

    
}

export default CitasProfesor;