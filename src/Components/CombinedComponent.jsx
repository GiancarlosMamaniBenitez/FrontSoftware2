import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

import SaldoActual from './SaldoActual';
import GastoActual from './GastoActual';

const saldoActualValue = SaldoActual.saldoActualValue;
const gastoActualValue = GastoActual.gastoActualValue;

function CombinedComponent() {
  
  //const saldoActualValue = SaldoActual.value;
//const gastoActualValue = GastoActual.value;

  const [saldoActualV, setSaldoActualV] = useState();


  const [rangeValue, setRangeValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0); // 


  //const saldoActualValue = SaldoActual.value; 
  
  //const gastoActualValue = GastoActual.value; 
  //const maxLimit = saldoActualValue - gastoActualValue;
  console.log(saldoActualValue);
  console.log(gastoActualValue);
  const maxLimit = saldoActualValue - gastoActualValue;

  

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log('Nuevo valor de rango:', value);
    setRangeValue(value);
  };

  const handleMaxValueChange = (event) => {
    const value = parseInt(event.target.value, 10);
    console.log('Nuevo valor de Max Value:', value);
    setMaxValue(value);
  };

  return (
    <div>

      <Form.Control
        type="text"
        placeholder="Disabled readonly input"
        aria-label="Disabled input example"
        readOnly
        value={maxLimit}
      />

        <Form.Group className="mb-3">
                <Form.Label>Max Value</Form.Label>
                <Form.Control
                type="number"
                value={maxLimit}
                //value={maxValue}
                //VALOR A CAMBIAR
                onChange={handleMaxValueChange}
                />
            </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Range</Form.Label>
        <Form.Range
          value={rangeValue}
          // value 
          onChange={handleRangeChange}
          max={maxLimit}
          //max={maxValue}
        />
      </Form.Group>
      
      

      <ProgressBar now={rangeValue} label={`${rangeValue}`} /*max={maxValue}*/max={maxLimit} />
    </div>
  );
}

export default CombinedComponent;
