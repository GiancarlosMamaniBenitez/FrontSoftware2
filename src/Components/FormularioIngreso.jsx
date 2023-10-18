import Form from 'react-bootstrap/Form';

function FormularioIngreso() {
  return (
    <>
        <div>
            <div>
                <Form.Label htmlFor="inputPassword5">Agregar Ingreso</Form.Label>
                <Form.Control
                    type="text"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    placeholder='Ingrese Monto'
                />
                
            </div>
            <div>
                <Form.Text>
                    ESCOGA UNA OPCION
                </Form.Text>
                <Form.Select aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                </Form.Select>
            </div>
        </div>
      
    </>
  );
}

export default FormularioIngreso;