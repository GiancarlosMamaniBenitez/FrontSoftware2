import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function ListGroups(props) {
  return (
    <ListGroup>
      <ListGroup.Item>{props.diasem} de {props.hinicio} a {props.hfin} <Button variant="danger">X</Button> </ListGroup.Item>
    </ListGroup>
  );
}

export default ListGroups;