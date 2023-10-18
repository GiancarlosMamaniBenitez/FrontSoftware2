import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
function SaldoActual() {
  const [saldoValue, setSaldoValue] = useState(700);
  return (
    <>
      <Form.Control
        type="text"
        placeholder="SALDO ACTUAL"
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
        value={saldoValue}
      />
    </>
  );
}

export default SaldoActual;