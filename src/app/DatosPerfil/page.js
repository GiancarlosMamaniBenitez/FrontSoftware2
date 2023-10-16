'use client'

import { Tab } from "bootstrap"
import { useState } from "react"
import ".//perfil1.css"
import Form from 'react-bootstrap/Form'


function Info(){
    return <div>
        <table className="tablaInfo">
            <tr>
                <td><h1 style={{fontSize:30, marginTop:30}}>Mi Perfil</h1></td>
                <td><button class="cancelar">Cancelar</button></td>
                <td><button class="guardar">Guardar</button></td>
            </tr>
        </table>
        <hr></hr>
        <h2 >Informacion Personal</h2>
        <table>
            <tr>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">Nombre</label><br/><input type="text" class="texto" name="" id="" /></div></td>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">Apellidos</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td style={{width: "20%"}}><div className="Contenedor"><label class="label">Tipo de Documento</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td style={{width: "20%"}}><img src="https://media.tenor.com/vjDSipHhsjAAAAAd/fortnite-snake-eyes.gif" style={{ width: "50%" }} alt=""/></td></tr>
            
            <tr>
            <td><div className="Contenedor"><label class="label">Rol</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td></td>
                <td><div className="Contenedor"><label class="label">Numero</label><br/><input type="text" class="texto" name="" id=""/></div></td>
                <td>Adjuntar foto</td>
            </tr>
        </table>
    </div>
}

function Datos(){
    const [opt, setOpt] = useState(0)
    
    let x
    if (opt === 0){
        x = <table className="tablaDatos"><br/>
        <tr>
            <td><div className="Contenedor"><br/><input type="text" class="texto3" name="" id=""/><label class="label3">Usuario</label></div></td>
        </tr>
        <tr>
            <td><div className="Contenedor"><label class="label3">Contraseña Actual</label><br/><input type="password" class="texto3" name="" id=""/></div></td>
            <td><div className="Contenedor"><label class="label3">Nueva Contraseña</label><br/><input type="password" class="texto3" name="" id="" /></div></td>
            <td><div className="Contenedor"><label class="label3">Repetir Contraseña</label><br/><input type="password" class="texto3" name="" id="" /></div></td>
        </tr>
        </table>
    }
    else if(opt === 1){
        x = <table className="tablaDatos"><br/>
        <tr>
            <td><div className="Contenedor"><label htmlFor="" class="label3" type="text" >Universidad</label><br/><input type="text" class="texto3"/></div></td>
           
    
            <td><div className="Contenedor"><label htmlFor="" class="label3">Agregar cursos</label><br/><input type="text" class="texto3" name="" id=""/></div></td>
        </tr>
        <tr>
            <td><div className="Contenedor"><label class="label3">Carrera</label><br/><input type="text" class="texto3" name=""/></div></td>
        </tr>   
        </table>
    }
    else{
        x = <table className="tablaDatos"><br/>
            <tr><div className="Contenedor"><label class="label2">Titulo</label><br/><input type="text" class="texto2" name=""/></div></tr>
            <tr><div className="Contenedor"><label class="label2">Descripcion</label><br/><input type="text" class="texto2" name=""/></div></tr>
            </table>
    }
    return <div><button className="datos" onClick={()=>setOpt(0)}>Datos de usuario</button><button className="datos" onClick={()=>setOpt(1)}>Universidad</button><button className="datos" onClick={()=>setOpt(2)}>Presentacion</button>
    {x}
    </div>
}

function PerfilDocente() {
    return <div>
        <div className="row">
        <div className="col-md-11"><Info/>
        <Datos/></div>
    </div>
    </div>
}

export default PerfilDocente
