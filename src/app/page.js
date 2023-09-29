'use client'

import styles from './page.module.css'
import Link from '../components/Link/Link.jsx';
import NavBar from '@/components/NavBar';

export default function Home() {

  return (
    <div className={styles.inte}>
      <div className={styles.red}>
        <Link href="/Login " text="LOGIN" />
        <b></b>
        <Link href="/IngresosGastos" text="INGRESOS GASTOS" />

        <Link href="/Terms" text="TERMINOS Y CONDICIONES" />
      </div>

      <div>
        <NavBar></NavBar>
      </div>
    </div>

  )
}

