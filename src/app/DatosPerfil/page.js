'use client'

import './perfil.css';
import ProgressBar from '../../components/ProgressBar.jsx';
import Range from '../../components/Range.jsx';
import { useState } from 'react';

import NavBar from '@/Components/NavBar';

function Info() {

   return <div>
    <div className="col-2">
                {/* Agregamos el VerticalMenu */}
                
                <NavBar/>
        </div>
        <table className="tablaInfo">           
            <tr>
                <td><h1 style={{fontSize:30, marginTop:30}}>Datos de Perfil</h1></td>
                <td><button class="cancelar">Cancelar</button></td>
                <td><button class="guardar">Guardar</button></td>
            </tr>
        </table>
        
        <br/><br/>
        <h2 >Informacion Personal</h2>
        <table>
            <tr>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">Nombre</label><br/><input type="text" class="texto" name="" id="" /></div></td>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">Apellidos</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">DNI</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td style={{width: "20%"}}><img src="https://img.freepik.com/premium-photo/blue-circle-with-man-s-head-circle-with-white-background_745528-3499.jpg" style={{ width: "50%" }} alt=""/></td></tr>
            
            <tr>
            <td><div className="Contenedor"><label class="label">Correo</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td></td>
                
                <td><div className="Contenedor"><label class="label">Numero</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td>Adjuntar foto</td>
            </tr>
        </table>
        <br/><br/>
        
   </div>
}

function Datos(){

    
    const [opt, setOpt] = useState(0)

    let x
    if (opt === 0){

        
        x = <table className="tablaDatos">
        
        <tr>
            <td><div className="Contenedor"><label class="label3">Pais</label><input type="text" class="texto3" name="" id=""/></div></td>
        </tr>
        <tr>
            <td><div className="Contenedor"><input type="text" class="texto3" name="" id=""/><label class="label3">Ciudad</label></div></td>
            <td><div className="Contenedor"><input type="text" class="texto3" name="" id="" /><label class="label3">Dirección</label></div></td>
            <td><div className="Contenedor"><input type="text" class="texto3" name="" id="" /><label class="label3">Codigo Postal</label></div></td>
        </tr>
        </table>
    }
    else if(opt === 1){
        x = <table className="tablaDatos">
        <tr>
            <td><div className="Contenedor"><label htmlFor="" class="label3" type="text" >Estudiante o trabajador</label><input type="text" class="texto3"/></div></td>
           
    
            <td><div className="Contenedor"><label htmlFor="" class="label3">Te encuentras trabajando actualmente?</label><input type="text" class="texto3" name="" id=""/></div></td>
        </tr>
        <tr>
            <td><div className="Contenedor"><label class="label3">¿Cuanto es tu ingreso mensual?</label><input type="text" class="texto3" name=""/></div></td>
        </tr>   
        </table>
    }
    else{
        x = <table className="tablaDatos"><br/>
            <tr><div className="Contenedor"><label class="label2">Empresa de trabajo</label><br/><input type="text" class="texto2" name=""/></div></tr>
            <tr><div className="Contenedor"><label class="label2">Cuanto tiempo llevas ahi</label><br/><input type="text" class="texto2" name=""/></div></tr>
            </table>
    }
    return <div>
        <h2>Informacion adicional</h2>
        <button className="datos" onClick={()=>setOpt(0)}>Vivienda</button><button className="datos" onClick={()=>setOpt(1)}>Situación Actual</button><button className="datos" onClick={()=>setOpt(2)}>Lugar de trabajo</button>
    {x}
    </div>
}

function DatosdePerfil(){
    return <div>
        <div className = "row">
            <div className = "col-md-11"><Info/>
            </div>
                <Datos/>
        </div>
    </div>
    }

export default DatosdePerfil;

