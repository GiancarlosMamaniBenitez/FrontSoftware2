'use client'
import React, { useState } from "react";

import ButtonsTarjeta from "@/Components/ButtonsTarjeta";

function VerTarjeta() {

    return(
        <div>
            <h1>
                TARJETAS REGISTRADAS
            </h1>
            <div>
                <h2>
                    ¿Que tipo de tarjetas desea registrar?
                </h2>
                <ButtonsTarjeta>

                </ButtonsTarjeta>
            </div>
        </div>
    )
}
export default VerTarjeta;