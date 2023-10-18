import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
function GastoActual() {
  const [gastoValue, setGastoValue] = useState(5);
  return (
    <>
      <Form.Control
        type="text"
        placeholder="GASTO ACTUAL"
        aria-label="Disabled input example"
        disabled
        readOnly
        value={'SALDO ACTUAL'}
      />
      <br />
      <Form.Control
        type="text"
        placeholder="Disabled readonly input"
        aria-label="Disabled input example"
        readOnly
        value={gastoValue}
      />
    </>
  );
}

export default GastoActual;