'use client'




import React, { useState, useEffect } from 'react';
import MenuNuevo from '@/Components/MenuNuevo';
import ButtonAgregarTarjeta from '@/Components/ButtonAgregarTarjeta';
import './tarjeta.css';
import EliminarTarjeta from '@/Components/EliminarTarjeta.jsx';
import EditarTarjeta from '@/Components/EditarTarjeta.jsx'; 
import NavBar from '@/Components/NavBar';
import TarjetasApi from '../api_fronted/tarjetas';
function VerTarjeta() {
  const [listcards, setListCards] = useState([]);
  const [selectedCard, setSelectedCard]=useState("")
  const maxCardLimit = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
  const [cards,setCards]=useState([])
  
  
  
  const LoadData = async() =>{
    const result = await TarjetasApi.findAll();
    setListCards(result.data)
  }
  const handleOnLoad = () => {

    let sesionGuardada = localStorage.getItem("sesion");
    setSesion(JSON.parse(sesionGuardada))
    console.log(sesion.id)
               
} 
  useEffect(() => {

    handleOnLoad();
    LoadData()
    //tarjetaLocal();
        
  }, []);
  /*
  const tarjetaLocal = async () =>{
    console.log(cards)
    sesion.Cards = [cards];

    localStorage.setItem('sesion', JSON.stringify(sesion));
                
    console.log(sesion)
}

  useEffect(() => {
   
    // Cargar las tarjetas del usuario desde currentUser
    if (sesion && sesion.cards) {
      setCards(sesion.cards);
    }
  }, [sesion]);
  console.log(sesion.card)*/

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType); // Actualiza selectedCard al seleccionar una tarjeta
  };

  const deleteCard = async(id) => {
    // Filtra las tarjetas para eliminar la que coincida con el 'id'
    const updatedCards = listcards.filter((elem) => elem.id !== id);
    const eliminada = listcards.find((elem) => elem.id == id);
    console.log(eliminada.id)
    //const result = await TarjetasApi.remove(eliminada.id);
    // Actualiza el estado de 'cards' para reflejar el cambio
    //setCards(updatedCards);
    }
  

  const editCard = (cardId) => {
    window.location.href = `/Edit-card?id=${cardId}`;
  };

  return (
    <div>
       <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`container1${isSidebarOpen ? '-shifted' : ''}`}>
        <div className="Agregar">
        <h1 className='title'>TARJETAS </h1>
        <div> 
          {listcards && listcards.length > 0 ? (
            <div>
             
              <div className="card-container">
                {listcards.filter((e) => e.id_usuario == sesion.id).map((elem, index) => (
                  <div key={index} className="card-option">
                    <div className="card-image-container">
                    <h1>{elem.cardType}</h1>
                    <hr />
                      <img src={`/${elem.cardType}.png`} alt={elem.type} className="card-image" />
                      <hr />
                      <EliminarTarjeta id={elem.id} onDeleteCard={deleteCard} />
                      <hr />
                      <EditarTarjeta cardId={elem.id} onEditCard={editCard} />
                      
                    </div>
                  </div>
                ))}
              </div>
              {listcards.filter((e) => e.id_usuario == sesion.id).length < maxCardLimit && (
                <div>
                  <h2>¿Qué tipo de tarjeta desea registrar?</h2>
                  <ButtonAgregarTarjeta selectedCard={selectedCard} handleCardSelection={handleCardSelection} />

                </div>
              )}
              {listcards.filter((e) => e.id_usuario == sesion.id).length >= maxCardLimit && (
                <p>No puedes agregar más de 5 tarjetas.</p>
              )}
            </div>
          ) : (
            <div>
              <h2>¿Qué tipo de tarjeta desea registrar?</h2>
              <ButtonAgregarTarjeta selectedCard={selectedCard} handleCardSelection={handleCardSelection} />

            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default VerTarjeta;
