import Tarjeta from "./Tarjeta";

export default function TarjetaMC({ tarjetaDetails }) {
 return (
   <Tarjeta tarjetaDetails={tarjetaDetails}>
     <div>MasterCard</div>
   </Tarjeta>
 );
}