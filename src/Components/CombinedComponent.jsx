import React, { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';

function CombinedComponent() {
  const [rangeValue, setRangeValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200); // Estado para el valor máximo

  const handleRangeChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setRangeValue(value);
  };

  const handleMaxValueChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setMaxValue(value);
  };

  return (
    <div>

        <Form.Group className="mb-3">
                <Form.Label>Max Value</Form.Label>
                <Form.Control
                type="number"
                value={maxValue}
                onChange={handleMaxValueChange}
                />
            </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Range</Form.Label>
        <Form.Range
          value={rangeValue}
          onChange={handleRangeChange}
          max={maxValue}
        />
      </Form.Group>
      
      

      <ProgressBar now={rangeValue} label={`${rangeValue}`} max={maxValue} />
    </div>
  );
}

export default CombinedComponent;
