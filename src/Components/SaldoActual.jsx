import Form from 'react-bootstrap/Form';

function SaldoActual() {
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
        value={'NO HAY SALDO'}
      />
    </>
  );
}

export default SaldoActual;