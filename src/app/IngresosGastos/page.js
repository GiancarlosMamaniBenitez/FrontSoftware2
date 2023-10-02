'use client'
import useFetchTarjetas from "../../fetchs/useFetchTarjetas";
import Tarjeta from "./TarjetaComp/Tarjeta";
import TarjetaVisa from "./TarjetaComp/TarjetaVisa";
import TarjetaMC from "./TarjetaComp/TarjetaMC";
import VerticalMenu from "@/components/VerticalMenu";
import 'bootstrap/dist/css/bootstrap.css'


function TarjetaApp() {

    const tarjetaTypes = {
        VISA: TarjetaVisa,
        MASTERCARD: TarjetaMC,

    }
    const { tarjetas } = useFetchTarjetas();
    return (
        <div className="container">

            <div className="col-2">
                {/* Agregamos el VerticalMenu */}

                <VerticalMenu >

                </VerticalMenu>
            </div>
            <div className="col-10">
            {tarjetas.map((tarjeta) => {
                const TarjetaComponent = tarjetaTypes[tarjeta.tipo_tarjeta]
                return <TarjetaComponent tarjetaDetails={tarjeta} key={tarjeta.numero} />
            })}
            </div>
        </div>
    )
}

export default TarjetaApp;