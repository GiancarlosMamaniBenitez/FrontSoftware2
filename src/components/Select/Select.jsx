import Form from 'react-bootstrap/Form';

const Select= ({ opt1, opt2, opt3, optDefault}) => {
  return (
    <Form.Select aria-label="Default select example">
      <option value={optDefault}>{optDefault}</option>
      <option value={opt1}>{opt1}</option>
      {(opt2==null)?
      <span></span>
      :
      <option value={opt2}>{opt2}</option>
      }
      {(opt3==null)?
      <span></span>
      :
      <option value={opt3}>{opt3}</option>
      }

    </Form.Select>
  );
}

export default Select;