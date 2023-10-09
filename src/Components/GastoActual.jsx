import Form from 'react-bootstrap/Form';

function GastoActual() {
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
        value={'TIENES MUCHOS GASTOS'}
      />
    </>
  );
}

export default GastoActual;