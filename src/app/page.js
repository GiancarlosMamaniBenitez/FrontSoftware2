'use client'


import Link from '../components/Link/Link.jsx';
import NavBar from '@/components/NavBar';
import MenuNuevo from '../Components/MenuNuevo.jsx';
import Image from 'next/image';
import './page.css';
import NavBarInicio from './NavBarInicio.jsx';
export default function Home() {
  return (
    
    <div>
<div>
<NavBarInicio/>
</div>
<div className='container'>
      <h1>Bienvenido</h1>
      <p>Ahora podrás mejorar la gestión de tus controles de gastos de tu tarjeta de créd
        ito o débito. Aparte contaras con métodos financieros para que pueda realizar esta
         gestión sin ningún problema.</p>
         <Image src="/Foquito.png" width="200" height="170" alt="Foquito" />
        <Image src="/Finanzas.png" width="200" height="170" alt="Finanzas" />
        <Image src="/GraficoBarras.jpg" width="200" height="170" alt="GraficoBarras" />
        <h1>Por qué elegirnos</h1>
        <h3>Simplicidad en la Complejidad</h3>
<p>Con WiseWallet, decir adiós al caos financiero es más fácil que nunca. Nuestra plataforma está diseñada para simplificar la gestión de múltiples tarjetas y cuentas, permitiéndote mantener un control total con unos pocos clics.</p>

<h3>Informes Mensuales Personalizados</h3>
<p>¿Necesitas un análisis detallado de tus finanzas mensuales? WiseWallet genera informes automáticos basados en tus datos, proporcionándote una visión clara de tus patrones de gastos e ingresos.</p>

<h3>Seguridad en Primer Lugar</h3>
<p>Entendemos la importancia de la seguridad de tus datos financieros. Utilizamos las últimas tecnologías de encriptación para garantizar que tu información esté siempre protegida.</p>

<h3>Asistencia en Tiempo Real</h3>
<p>Nuestro equipo de soporte está listo para responder tus preguntas y brindarte asistencia cuando la necesites. Estamos comprometidos a proporcionar un servicio excepcional y resolver tus inquietudes de manera oportuna.</p>

        <p></p>
        <h2>Sobre Nosotros</h2>
        <p>Bienvenido a WiseWallet, tu compañero financiero personalizado. En un mundo lleno de transacciones, es crucial mantener el control de tus finanzas de manera eficiente y efectiva. En WiseWallet, hemos creado una plataforma intuitiva que te permite centralizar y gestionar tus gastos e ingresos de diferentes tarjetas, todo en un solo lugar.

Nuestra misión es proporcionar a cada usuario una experiencia transparente y fácil de usar. Creemos que el poder de tomar decisiones financieras informadas está en tus manos y estamos aquí para facilitarlo. Con una interfaz amigable y funcionalidades avanzadas, te ayudamos a visualizar tus datos de manera clara y concisa.</p>
        </div>
    </div>
  );
}



