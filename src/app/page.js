'use client'

import styles from './page.module.css';
import Link from '../components/Link/Link.jsx';
import NavBar from '@/components/NavBar';

import Image from 'next/image';

export default function Home() {
  return (
    <div className={styles.container}>

      
      <div className={styles.red}>
        <div className={styles.Idioma}>
          <h1>Idioma: Español     |   Contáctanos </h1>
        </div>
        <div className={styles.login}>

        <button className={styles.miBoton1}>Ingresar sesión</button>
        <button className={styles.miBoton2}>Registrarse</button>

         <Link href="/Login" text="LOGIN " />
         
         <Link href="/IngresosGastos" text=" INGRESOS GASTOS" />

         <Link href="/" text="INICIO " />

         </div> 

        <div className={styles.PorqueE}>
        <h1>Por qué elegirnos</h1>
        </div>
        <div className={styles.SNosotros}>
          <h1>Sobre Nosotros</h1>
        </div>
        
      </div>
   
      <div className={styles.centeredText2}>
        <h1>WISE WALLET</h1>
      </div>
      
      <div className={styles.content}>
        <div className={styles.centeredText}>
        <h1>Ahora podrás mejorar la gestión de tus controles de gastos de tu tarjeta de crédito o débito. Aparte contaras con métodos financieros para que pueda realizar esta gestión sin ningún problema. </h1>
        </div>
        <Image src="/Foquito.png" width="400" height="341" alt="Foquito" />
        <Image src="/Finanzas.png" width="400" height="341" alt="Finanzas" />
        <Image src="/GraficoBarras.jpg" width="400" height="341" alt="GraficoBarras" />
      </div>

      <div className={styles.Terminos}>
        <Link href="/Terms" text="TERMINOS Y CONDICIONES" />
      </div>
      
    </div>
    
  );
}




