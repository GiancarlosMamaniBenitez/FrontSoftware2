'use client'
import React from 'react';
import Tarjeta from './TarjetaComp/Tarjeta';
import TarjetaVisa from './TarjetaComp/TarjetaVisa';
import TarjetaMC from './TarjetaComp/TarjetaMC';
import MenuNuevo from '../../Components/MenuNuevo';
import useFetchTarjetas from '@/fetchs/useFetchTarjetas';
import SaldoActual from '@/Components/SaldoActual';
import GastoActual from '@/Components/GastoActual';
import CombinedComponent from '@/Components/CombinedComponent';
import { Button } from 'react-bootstrap';
import './App.css'
const TarjetaApp = () => {
    const tarjetaTypes = {
        VISA: TarjetaVisa,
        MASTERCARD: TarjetaMC,

    }
    const { tarjetas } = useFetchTarjetas();
  
    return (
           
        <>

        <div>
                        <MenuNuevo>
        
                        </MenuNuevo>
                    </div>
        <div className='container'>
            <div className="SaldoAct">
                <h2>SALDO ACTUAL</h2>
                <SaldoActual>

                </SaldoActual>
            </div>
            
            <div className="GastoAct">
                <h2>GASTO ACTUAL</h2>
                <GastoActual>
                    
                </GastoActual>
            </div>
            

            <div className="ProgresBar">
                <div>
                    <h1>LIMITE DE GASTOS</h1>
                </div>
                <CombinedComponent></CombinedComponent>
            </div>
            <br>
            </br>
            <div>
            <Button variant="primary">GUARDAR LIMITE GASTO</Button>{' '}
            </div>
        </div>
                </>
       
    )
}

export default TarjetaApp;