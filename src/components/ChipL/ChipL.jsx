import './style.css'
import { Form } from 'react-bootstrap'
import Button from '../Button/Button.jsx'

const ChipL = ({ nombre, carrera, universidad, handleCita }) => {
    return (
        <div className="chip">
        <p className="nom">{ nombre }</p>
        <p className="cur">{universidad}</p><span className="cur">- {carrera}</span>
        <Form onSubmit={() => handleCita}>
        <Button className="but" variant="light" type="submit"  texto=">"/>
        </Form>
        </div>
    )
}

export default ChipL

