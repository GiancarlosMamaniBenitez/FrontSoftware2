import { useState, useEffect } from "react";
export default function useFetchTarjetas() {
 const [tarjetas, setTarjetas] = useState([]);
 const DB = "http://localhost:5000/tarjetas"
 useEffect(() => {
   const fetchTarjetas = async () => {
    try{
        const response = await fetch(DB)
        const data = await response.json();
        setTarjetas(data)   
    }catch(error){
        console.error("error fetch", error)
    }
   };

   fetchTarjetas();
 }, []);

 return { tarjetas };
}
