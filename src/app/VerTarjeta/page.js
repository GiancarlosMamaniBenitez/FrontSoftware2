'use client'
import React, { useState } from "react";

import ButtonAgregarTarjeta from "@/Components/ButtonAgregarTarjeta";
import ButtonEliminarTarjeta from "@/Components/ButtonEliminarTarjeta";
import MenuNuevo from "../MenuNuevo";
import Tarjeta from "./Tarjeta.css"
function VerTarjeta() {

    return(
        <div>
            <div>
                <MenuNuevo>

                </MenuNuevo>
            </div>
            <div class="Agregar">
                <h1>
                TARJETAS REGISTRADAS
                </h1>
                <div>
                    <h2>
                        ¿Que tipo de tarjetas desea registrar?
                    </h2>
                    <ButtonAgregarTarjeta>

                    </ButtonAgregarTarjeta>
                </div>
            </div>
            

            <div class="Eliminar">
                <h2>
                    ¿Desea eliminar alguna tarjeta?
                </h2>
                <ButtonEliminarTarjeta>

                </ButtonEliminarTarjeta>
            </div>
        </div>
    )
}
export default VerTarjeta;