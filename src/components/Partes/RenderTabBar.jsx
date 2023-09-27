import Form from 'react-bootstrap/Form';
import React from 'react';
import TabContainer from 'react-bootstrap/TabContainer';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Chip from './ChipG';
import PaginaComp from './PaginaComp'

const RenderTabBar = ({
        
    
    
usuario,
setUsuario,
presentacion,
setPresentacion,
textBusqueda1,
setTextBusqueda1,
textBusqueda2,
setTextBusqueda2,
textBusqueda3,
setTextBusqueda3,
arr1=[],
arr2=[],
arr3=[],
    }) =>{

  const handleTituloChange=(e)=> {
    setPresentacion({ ...presentacion, titulo: e.target.value });
    }

    const handlePresentacionChange=(e)=> {
    setPresentacion({ ...presentacion, presentacion: e.target.value });
    }
    const handleUniversidadChange=(e)=> {
        setTextBusqueda1(e.target.value);
        
        
    }
    const handleCarreraChange=(e)=>{
        setTextBusqueda2(e.target.value);

    }
    const handleCursoChange=(e)=>{
        setTextBusqueda3(e.target.value);

    }


return (
<TabContainer defaultActiveKey="datosUsuario" id="fill-tab-example" className="mb-3" fill>
  <Nav variant="tabs" className="mb-3">
    <Nav.Item>
      <Nav.Link eventKey="datosUsuario">Datos de Usuario</Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link eventKey="universidad">Universidad</Nav.Link>
    </Nav.Item>

    <Nav.Item>
      <Nav.Link eventKey="presentacion">Presentación</Nav.Link>
    </Nav.Item>
  </Nav>

  <Tab.Content>
    <Tab.Pane eventKey="datosUsuario">
      <div>
        <Form.Label htmlFor="usuario">Usuario</Form.Label>
        <Form.Control
          type="text"
          id="usuario"
          value={usuario.usuario}
          onChange={(e) =>
            setUsuario({ ...usuario, usuario: e.target.value })
          }
        />

        <Form.Label htmlFor="constraseñaActual">Contraseña Actual</Form.Label>
        <Form.Control
          type="password"
          id="constraseñaActual"
          value={usuario.constraseñaActual}
          onChange={(e) =>
            setUsuario({ ...usuario, constraseñaActual: e.target.value })
          }
        />

        <Form.Label htmlFor="nuevaContraseña">Nueva Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="nuevaContraseña"
          value={usuario.nuevaContraseña}
          onChange={(e) =>
            setUsuario({ ...usuario, nuevaContraseña: e.target.value })
          }
        />

        <Form.Label htmlFor="repetirContraseña">Repetir Contraseña</Form.Label>
        <Form.Control
          type="password"
          id="repetirContraseña"
          value={usuario.repetirContraseña}
          onChange={(e) =>
            setUsuario({ ...usuario, repetirContraseña: e.target.value })
          }
        />
      </div>
    </Tab.Pane>

    <Tab.Pane eventKey="universidad">
      <div>
        {
            <div>
            <div>
                <Form.Control 
                    type="text"
                    id="universidad"
                    value={textBusqueda1}
                    onChange={handleUniversidadChange}
                ></Form.Control>
                <ul className="nobullets">
                            { arr1.filter(f => f.includes(textBusqueda1))
                                .map(universidad =>{
                                return(<li key={universidad} >
                                    <Chip text={universidad} />
                                    </li>);
                            }) } 
                        </ul>
                
            </div>

            <div>
                <Form.Control 
                    type="text"
                    id="universidad"
                    value={textBusqueda2}
                    onChange={handleCarreraChange}
                ></Form.Control>
                <ul className="nobullets">
                            { arr2.filter(f => f.includes(textBusqueda2))
                                .map(carrera =>{
                                return(<li key={carrera} >
                                    <Chip text={carrera} />
                                    </li>);
                            }) } 
                        </ul>
                
            </div>

            <div>
                <Form.Control 
                    type="text"
                    id="universidad"
                    value={textBusqueda3}
                    onChange={handleCursoChange}
                ></Form.Control>
                <ul className="nobullets">
                            { arr3.filter(f => f.includes(textBusqueda3))
                                .map(curso =>{
                                return(<li key={curso} >
                                    <Chip text={curso} />
                                    </li>)
                            }) } 
                        </ul>
                
            </div>

        </div>
        }
      </div>
    </Tab.Pane>

    <Tab.Pane eventKey="presentacion">
      <div>
        <Form.Label htmlFor="titulo">Titulo</Form.Label>
        <Form.Control
          type="text"
          id="titulo"
          value={presentacion.titulo}
          onChange={handleTituloChange}
        />

        <Form.Label htmlFor="presentacion">Presentación</Form.Label>
        <Form.Control
          type="text"
          id="presentacion"
          value={presentacion.presentacion}
          onChange={handlePresentacionChange}
        />
      </div>
    </Tab.Pane>
  </Tab.Content>
</TabContainer>
);
}

export default RenderTabBar;