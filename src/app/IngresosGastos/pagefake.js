'use client'
import React from 'react';
import { useState } from 'react';

import './App.css';
import ProgressBar from '../../components/ProgressBar.jsx';
import Range from '../../components/Range.jsx';
import CombinedComponent from '../../components/CombinedComponent.jsx';

import VerticalMenu from '@/components/VerticalMenu';

function MyPage() {

  const [newMontoI, setNewMontoI] = useState(0);
  const [newTipoI, setNewTipoI] = useState("");
  const [newMontoG, setNewMontoG] = useState(0);
  const [newTipoG, setNewTipoG] = useState("");

  const onSubmitIngreso = () => {
      // Lógica para manejar el ingreso (sin la dependencia de Firebase)
  }

  const onSubmitGasto = () => {
      // Lógica para manejar el gasto (sin la dependencia de Firebase)
  }

  return (
    <div className="container">
        <div className="row ">
            <div className="col-2">
                {/* Agregamos el VerticalMenu */}
                
                <VerticalMenu >

                </VerticalMenu>
            </div>
            <div className="col-10">
                <div className="col h2 text-center">  
                    Tarjeta **variable**
                    <img src="" alt="" className='col'/>
                </div>
                <div>
                    <div className='row card h3 py-2 mx-auto w-50 '>
                        <div className='card-body'>
                            SALDO ACTUAL: **variable**
                        </div>
                    </div>
                    <div className="row h3">
                        Actualizar Ingresos
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='col ms-4'>
                                Agregar Ingresos:
                            </div>
                            <input 
                                type="Ingresar Monto" 
                                className='ms-4 form-control rounded'
                                onChange={(e)=> setNewMontoI(Number(e.target.value))}
                            />
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de ingreso:
                            </div>
                            <input 
                                type="Ingresar tipo de ingreso" 
                                className='ms-4 form-control rounded'
                                onChange={(e)=> setNewTipoI(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='row h3'>
                        Actualizar Gastos
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div className='ms-4'>
                                Agregar Gastos:
                            </div>
                            <input 
                                type="Ingresar Monto" 
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewMontoG(Number(f.target.value))}
                            />
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de gasto:
                            </div>
                            <input 
                                type="Ingresar tipo de gasto" 
                                className='ms-4 form-control rounded'
                                onChange={(f)=> setNewTipoG(f.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-2 d-flex flex-row-reverse align-items-center'>
                <button 
                    className='btn btn-primary align-middle' 
                    type='button'
                    onClick={()=> {
                        onSubmitIngreso();
                        onSubmitGasto();
                    }}
                >
                    Actualizar
                </button>
            </div>
            <div className="ProgresBar">
                <div>
                    <h1>LIMITE DE GASTOS</h1>
                </div>
                <CombinedComponent></CombinedComponent>
            </div>
        </div>
    </div>
);
}

export default MyPage;