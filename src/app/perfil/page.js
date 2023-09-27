'use client'
import Button from "@/components/Button/Button"

const perfil = () =>{
    

    return(
        <div className="contenedor">
            <nav className="perfilbase">
                <p>PARTE Mi perfil</p>

                <div className="tituloperfil">
                    <section className="titulocabecera">
                        <p>MI PERFIL</p>

                    </section>
                    <aside clasName="botonguardar">
                        <button>GUARDAR</button>

                    </aside>
                    
                    
                </div>


                <div className="datosperfil">
                    <section className="cuadroperfil">
                        <p>Informacion Personal</p>
                    </section>
                    <aside className="imagenperfil">
                        <p>en esta parte va la foto</p>
                    </aside>
                </div>

            </nav>

            <section className="datosbase">
                <p>PARTE Datos de usuario/Universidad/Presentacion/Grado</p>
            </section>

        </div>

        

        
    )
} 

export default perfil