import { useState, useEffect } from "react";
export default function useFetchTarjetas() {
 const [tarjetas, setTarjetas] = useState([]);
 

 onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    
    const uid = user.uid;
    const DB = `https://us-central1-software-backend-43062.cloudfunctions.net/app/usuarios/${uid}/tarjetas`
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
    // ...
  } else {
    // User is signed out
    // ...
    console.log("no se creo la cuenta")
  }
});
 return { tarjetas };
}
