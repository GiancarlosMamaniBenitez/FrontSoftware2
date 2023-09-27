import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Chip from '../ChipL/ChipL.jsx'
import './style.css'
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


const FilterNames =({Lpersonas, Lcarreras})=>{
    const [visual,setVisual] = useState("Nom")
    const [textBusqueda, setTextBusqueda] = useState("")
    const profes = Lpersonas.filter( per => per.role.descripcion == "Profesor")

    const handleCita =({profesor},event)=>{
        event.preventDefault()
        localStorage.setItem('citaVision',JSON.stringify(profesor))
    }

    const handleClickNom =(event)=>{
        event.preventDefault()
        console.log(Lpersonas)
        console.log(Lcarreras)
        console.log(profes)
        setVisual("Nom")
    }

    const handleClickHor =(event)=>{
        event.preventDefault()
        setVisual("Hor")
    }

    return (
        <div>
            <Form.Control 
                type="text"
                value={textBusqueda}
                onChange={e => setTextBusqueda(e.target.value)}
                ></Form.Control>
                <ButtonGroup aria-label="Basic example">
                  <Button onClick={handleClickNom} variant="secondary">Por Nombre</Button>
                  <Button onClick={handleClickHor} variant="secondary">Por Horario</Button>
                </ButtonGroup>
                {(visual == "Nom") ?
                 <ul className="nobullets">
                    { profes.filter(f => (f.nombre).includes(textBusqueda))
                        .map(profesor =>{
                        return (<li key={profesor.nombre} >
                            <Chip nombre={profesor.nombre} carrera={(Lcarreras?.filter(f => (f.id)==profesor.idCarrera)).nombre} universidad={(Lcarreras.filter(f => (f.id)==profesor.idCarrera)).universidade.descripcion} handleCita={(event) => handleCita(event, { profesor })}/>
                            </li>)
                    }) } 
                 </ul>
        
                :
                 <div>
                    <ul className="nobullets">
                    { profes.filter(f => (f.horarios).includes(textBusqueda))
                        .map(profesor =>{
                        return (<li key={profesor.nombre} >
                            <Chip nombre={profesor.nombre} carrera={(Lcarreras.filter(f => (f.id)==profesor.idCarrera)).descripcion} universidad={(Lcarreras.filter(f => (f.id)==profesor.idCarrera)).universidade.descripcion} handleCita={(event) => handleCita(event, { profesor })}/>
                            </li>)
                    }) } 
                 </ul>
                 </div>
                 }
     </div>
    )
}

export default FilterNames