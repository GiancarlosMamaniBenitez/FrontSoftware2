import React from 'react';
import { useState } from 'react';
import { db } from './config/Backend';
import { addDoc, collection, serverTimestamp} from 'firebase/firestore';
import './App.css';

import ProgressBar from './Components/ProgressBar.jsx';
import Range from './Components/Range.jsx';
import CombinedComponent from './Components/CombinedComponent';


function MyPage() {

    const [newMontoI, setNewMontoI] = useState(0)
    const [newTipoI, setNewTipoI] = useState("")
    
    const [newMontoG, setNewMontoG] = useState(0)
    const [newTipoG, setNewTipoG] = useState("")


    const ingresosColecctionRef = collection(db,"Ingresos")
    const gastosColecctionRef = collection(db,"Gastos")

    const onSubmitIngreso = async () => {
        await addDoc(ingresosColecctionRef, {monto: newMontoI, tipo: newTipoI, hora:serverTimestamp()})
    }

    const onSubmitGasto = async () => {
        await addDoc(gastosColecctionRef, {monto: newMontoG, tipo: newTipoG, hora:serverTimestamp()})
    }

  return (
    <div className="container">
        <div className="row ">
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
                            onChange={(e)=> setNewMontoI(Number(e.target.value))}/>
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de ingreso:
                            </div>
                            <input 
                            type="Ingresar tipo de ingreso" 
                            className='ms-4 form-control rounded'
                            onChange={(e)=> setNewTipoI(e.target.value)}/>
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
                            
                            <input type="Ingresar Monto" 
                            className='ms-4 form-control rounded'
                            onChange={(f)=> setNewMontoG(Number(f.target.value))}/>
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de gasto:
                            </div>
                            
                            <input type="Ingresar tipo de gasto" 
                            className='ms-4 form-control rounded'
                            onChange={(f)=> setNewTipoG(f.target.value)}/>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='col-2 d-flex flex-row-reverse align-items-center'>
                
                    <button className='btn btn-primary align-middle' 
                    type='button'
                    onClick={()=> {onSubmitIngreso();
                    onSubmitGasto();}}>
                        Actualizar
                    </button>
            
            </div>
            <div className="ProgresBar">
                <div>
                    <hi>LIMITE DE GASTOS</hi>
                </div>
                        <CombinedComponent></CombinedComponent>
                        
            </div>
        </div>
    </div>
  );
}

export default MyPage;