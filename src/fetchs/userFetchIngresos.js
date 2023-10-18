import { useState, useEffect } from "react";
export default function useFetchIngresos() {
 const [ingresos, setIngresos] = useState([]);
 const DB = "http://localhost:5000/ingresos"
 useEffect(() => {
   const fetchIngresos = async () => {
    try{
        const response = await fetch(DB)
        const data = await response.json();
        setIngresos(data)   
    }catch(error){
        console.error("error fetch", error)
    }
   };

   fetchIngresos();
 }, []);

 return { ingresos };
}
