'use client'

import styles from './page.module.css'
import Link from '../components/Link/Link.jsx';

export default function Home() {

  return (
    <div className={styles.inte}>
      <div className={styles.red}>
        <Link href="/login " text="BIENVENIDO AL MUNDO MAGICO DE GUMBALL" />
      </div>
    </div>

  )
}

