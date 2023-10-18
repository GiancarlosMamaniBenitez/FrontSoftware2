import React, { useState, Timestamp } from "react";

import {Button, Divider, TextField} from "@mui/material";
export default function Ingresos(){/*
    const [ingreso,setIngreso] = useState({
        id:'',
        monto:'',
        tipo_ingreso: '',
    })


    const controlarEnvio = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/ingresos',{
            method:'POST',
            body: JSON.stringify(ingreso),
            headers: {"Content-Type": "application/json"}
        })
        const data = await res.json()
        console.log(data)
    }

    const controlarCambio = e => {
        console.log(e.target.name, e.target.value)
        setIngreso({...ingreso, [e.target.name]:e.target.value})
    }*/

    return(
        <div className="container">
        <form>
                    <div className='row'>
                        
                        
                        <div className='col'>
                            <div className='col ms-4'>
                                Agregar Ingresos:
                            </div>
                            <TextField name=""  
                            //onChange={controlarCambio} 
                            className='ms-4 form-control rounded' variant='filled' label='Ingresa monto'></TextField>
                            
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de ingreso:
                            </div>
                            <TextField name= "" 
                             //onChange={controlarCambio} 
                             className='ms-4 form-control rounded' variant='filled' label='Ingresa tipo'></TextField>
                        </div>
                        <Divider className='my-4'/>
                        <Button variant="contained" className="mx-auto w-50"
                        //onClick={controlarEnvio}
                        > Actualizar </Button>
                    </div>
                    </form>
        </div>

    )
    //
    /*
    const montoCambio = (e) => {
        setMontoIngreso(...montoIngreso,[e.target.value]);
    }

    const onSubmitIngreso = async (e) =>{
        e.preventDefault();
        try{
            const body = {montoIngreso}
            await fetch("http://localhost:5000/ingresos",{
              method: "POST",
              headers :{
                "Content-Type": "application/json"
              }  ,
              body: JSON.stringify(body)
            })
        }catch(err){
            console.log(err.message);
        }
    }
*/

    
}
