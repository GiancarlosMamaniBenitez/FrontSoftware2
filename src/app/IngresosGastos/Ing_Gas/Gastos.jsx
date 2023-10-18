import {Button, Divider, TextField} from "@mui/material";
import React, { useState, Timestamp } from "react";
export default function Gastos(){
    return(
        <div className="container">
        <form>
           
                    <div className='row'>
                        
                        
                        <div className='col'>
                            <div className='col ms-4'>
                                Agregar Gastos:
                            </div>
                            <TextField name=""  
                            //onChange={controlarCambio} 
                            className='ms-4 form-control rounded' variant='filled' label='Ingresa monto'></TextField>
                            
                        </div>
                        <div className='col'>
                            <div className='ms-4'>
                                Tipo de gasto:
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
}