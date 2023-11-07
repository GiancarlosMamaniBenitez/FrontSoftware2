// Página para editar los detalles de la tarjeta
'use client'



import React, { useState, useEffect } from "react";
import NavBar from "@/Components/NavBar";
import './addCard.css';
import TarjetasApi from "../api_fronted/tarjetas";

const EditCard = () => {
  const [number, setNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yyyy, setYyyy] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(null);
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const idParam = urlParams.get("id")
  const [tarjeta, setTarjeta] = useState({})
  const [sesion , setSesion] = useState({});
  const [selectedCardId, setSelectedCardId] = useState(null); // Inicializa selectedCardId como null.

  const verificarSesion = () =>{
    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion.id)
  }


  const recogerDataTarjetaId = async () =>{
    const result = await TarjetasApi.findOne(idParam)
    setTarjeta(result.data)
    setNumber(result.data.number)
    setMm(result.data.mm)
    setYyyy(result.data.yyyy)
    setCvv(result.data.cvv)
  }
  useEffect(() => {
    verificarSesion()
    recogerDataTarjetaId()
    
  }, []);

  const handleNumberChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ");
    setNumber(formattedValue);
  };

  const handleMmChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 2);
    setMm(numericValue);
  };

  const handleYyyyChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 4);
    setYyyy(numericValue);
  };

  const handleCvvChange = (event) => {
    const numericValue = event.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(numericValue);
  };

  const validateFields = () => {
    if (!number || !mm || !yyyy || !cvv) {
      setError("Por favor, complete todos los campos.");
      return false;
    }
    return true;
  };

  const redirectToHome = () => {
    window.location.href = "/VerTarjeta";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateFields()) {
      // Obtener el usuario autenticado desde el Local Storage
      const authenticatedUser = JSON.parse(localStorage.getItem("currentUser"));

      const cardData = {
         // Utiliza el ID de la tarjeta seleccionada
        number: number,
        mm: mm,
        yyyy: mm,
        cvv: cvv,
      };
      try {
        // Realiza la solicitud POST al backend para registrar el nuevo usuario utilizando la función personasApi
        const response = await TarjetasApi.update(idParam,cardData);
        recogerDataTarjetaId()
        
        // Comprueba el resultado de la solicitud
          if (response && response.status === 200) {
              // Registro exitoso, redirige a la página de inicio de sesión
              alert('Actualización exitosa!');
              router.push('/Congrats');
          } else {
              // Manejo de errores en caso de que algo salga mal en el backend
              alert('Error al actualizar usuario');
          }
      } catch (error) {
         }
    }
  };

  return (
    <div>
      <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className="addCard-container">
        <h1>Edit your card.</h1>
        {error && <p className="error-message">{error}</p>}
        <hr />
        <input
          className="number-input"
          type="text"
          name="number"
          placeholder="1111 2222 3333 4444"
          value={number}
          onChange={handleNumberChange}
        />
        <hr />
        <table>
          <tr>
            <td>
              <input
                className="MM-input"
                type="text"
                name="mm"
                placeholder="MM"
                value={mm}
                onChange={handleMmChange}
              />
            </td>
            <td>
              <input
                className="YYYY-input"
                type="text"
                name="yyyy"
                placeholder="YYYY"
                value={yyyy}
                onChange={handleYyyyChange}
              />
            </td>
          </tr>
        </table>
        <hr />
        <input
          className="cvv-input"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange}
        />
        <hr />
        <button className="add-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditCard;
