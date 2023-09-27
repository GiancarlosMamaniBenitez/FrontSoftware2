import Boton from 'react-bootstrap/Button';
import './page.modul.css'
const Button = ({ onClick, texto, variant, type, className }) => {
    return (
        <Boton className={className} onClick={() => onClick } variant={variant} type={type}>{ texto }</Boton>
    )
}

export default Button