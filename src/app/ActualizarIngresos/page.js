'use client'
import MenuNuevo from "../../Components/MenuNuevo";
import FormularioIngreso from "@/Components/FormularioIngreso";
import BotonActualizar from "@/Components/BotonActualizar";
import actIngr from './actIngr.css';
function ActualizarIngreso(){

    return(
        <div>
            <div>
                <MenuNuevo>

                </MenuNuevo>
            </div >
            <div className="actIngr">
                <FormularioIngreso>

                </FormularioIngreso>
                <br>
                </br>
                <BotonActualizar>

                </BotonActualizar>
            </div>
        </div>

    )
}
export default ActualizarIngreso;