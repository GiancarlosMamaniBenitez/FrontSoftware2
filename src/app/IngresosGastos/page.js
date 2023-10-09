'use client'
import useFetchTarjetas from "../../fetchs/useFetchTarjetas";
import Tarjeta from "./TarjetaComp/Tarjeta";
import TarjetaVisa from "./TarjetaComp/TarjetaVisa";
import TarjetaMC from "./TarjetaComp/TarjetaMC";
import VerticalMenu from "@/components/VerticalMenu";
import CombinedComponent from "@/components/CombinedComponent";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import FormularioIngreso from "@/Components/FormularioIngreso";
import FormularioGasto from "@/Components/FormularioGasto";
import BotonActualizar from "@/Components/BotonActualizar";
import SaldoActual from "@/Components/SaldoActual";
import GastoActual from "@/Components/GastoActual";
import MenuNuevo from "../MenuNuevo";


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

                <MenuNuevo>
                    
                </MenuNuevo>
            </div>
            <div className="col-10">
            {tarjetas.map((tarjeta) => {
                const TarjetaComponent = tarjetaTypes[tarjeta.tipo_tarjeta]
                return <TarjetaComponent tarjetaDetails={tarjeta} key={tarjeta.numero} />
            })}
            </div>

            <div className="SaldoAct">
                <h2>SALDO ACTUAL</h2>
                <SaldoActual>

                </SaldoActual>
            </div>
            <div className="FormIng">
                <h2>ACTUALIZAR INGRESOS</h2>
                <FormularioIngreso>
                    
                </FormularioIngreso>

            </div>
            <div className="GastoAct">
                <h2>GASTO ACTUAL</h2>
                <GastoActual>
                    
                </GastoActual>
            </div>
            <div className="FormGast">
                <h2>ACTUALIZAR GASTOS</h2>
                <FormularioGasto>

                </FormularioGasto>
            </div>

            <div className="ProgresBar">
                <div>
                    <h1>LIMITE DE GASTOS</h1>
                </div>
                <CombinedComponent></CombinedComponent>
            </div>
            <br>
            </br>
            <div>
                <BotonActualizar>

                </BotonActualizar>
            </div>
        </div>
    )
}

export default TarjetaApp;