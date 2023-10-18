'use client'
import MenuNuevo from "../../Components/MenuNuevo";
import BotonActualizar from "@/Components/BotonActualizar";
import actGast from './actGast.css';
import FormularioGasto from "@/Components/FormularioGasto";
function ActualizarGastos(){

    return(
        <div>
            <div>
                <MenuNuevo>

                </MenuNuevo>
            </div>
            <div class="ActualizarGast">
                <FormularioGasto>

                </FormularioGasto>
                <br>
                </br>
                <BotonActualizar>

                </BotonActualizar>
            </div>
        </div>
    )
}
export default ActualizarGastos;