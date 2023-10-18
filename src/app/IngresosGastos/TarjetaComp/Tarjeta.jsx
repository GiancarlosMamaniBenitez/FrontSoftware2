import Ing_Gas from "../Ing_Gas/Ing_Gas";
import { Button, Divider, TextField } from "@mui/material";

export default function Tarjeta({ tarjetaDetails, children }) {

    const { numero, tipo_tarjeta } = tarjetaDetails;

    return (
        <div className="container">
            <div className="row ">
                <Divider className='my-4' />
                <div className="col">
                    <div className="col h2 text-center">
                        Tarjeta {children}
                        <img src="" alt="" className='col' />
                    </div>
                    <div>
                        <div className='row card h3 py-2 mx-auto w-50 '>
                            <div className='card-body text-center'>
                                SALDO ACTUAL: {numero}
                            </div>

                        </div>
                        <Ing_Gas/>

                    </div>
                </div>

            </div>
        </div>
    )
}
/*
export default function Tarjeta() {
    const { tarjetas } = useFetchTarjetas();
    
    return tarjetas.map((tarjeta) => (
        <div>aaaaaaa
            <h3>{tarjeta.numero}</h3>
        </div>
        
    ))

}*/