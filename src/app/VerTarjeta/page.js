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
  
  
  useEffect(() => {
      const handleOnLoad = async () => {

        let sesionGuardada = localStorage.getItem("sesion");
        // Verifica si el usuario ha iniciado sesión
         
          if(sesionGuardada == undefined){
          
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(sesion)
          const result = await TarjetasApi.findAll();
          setListCards(result.data);
          console.log(listcards);
        
          
        const  filtrarTarjeta = async (listcards, sesion) =>{
          let TarjetasFiltradas = []
          TarjetasFiltradas = listcards.filter((e) => e.id == sesion.id)
          return TarjetasFiltradas;
      } 
          const TarjetasFiltradas = await filtrarTarjeta(listcards, JSON.parse(sesionGuardada));
                  setCards(TarjetasFiltradas);
                  
                 
                   
    } 
    
    handleOnLoad();
    tarjetaLocal();
        
  }, []);
  
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
  console.log(sesion.card)

  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType); // Actualiza selectedCard al seleccionar una tarjeta
  };

  const deleteCard = (id) => {
    // Filtra las tarjetas para eliminar la que coincida con el 'id'
    const updatedCards = cards.filter((card) => card.id !== id);
  
    // Actualiza el estado de 'cards' para reflejar el cambio
    setCards(updatedCards);
  
    // Actualiza también el estado de 'sesion.cards' si es necesario
    if (sesion && sesion.cards) {
      sesion.cards = [...sesion.cards, cards.find((card) => card.id === id)];
    }
  
    // Actualiza el almacenamiento local con las tarjetas actualizadas
    const sesionActualizada = { ...sesion, cards: updatedCards };
    //localStorage.setItem("sesion", JSON.stringify(sesionActualizada));
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
          {cards && cards.length > 0 ? (
            <div>
              <h2>¿Desea eliminar alguna tarjeta o ver más detalles?</h2>
              <div className="card-container">
                {cards.map((card, index) => (
                  <div key={index} className="card-option">
                    <div className="card-image-container">
                    <h1>Tarjeta</h1>
                    <hr />
                      <img src={`/${card.cardType}.png`} alt={card.type} className="card-image" />
                      <hr />
                      <EliminarTarjeta id={card.id} onDeleteCard={deleteCard} />
                      <hr />
                      <EditarTarjeta cardId={card.id} onEditCard={editCard} />
                      
                    </div>
                  </div>
                ))}
              </div>
              {cards.length < maxCardLimit && (
                <div>
                  <h2>¿Qué tipo de tarjeta desea registrar?</h2>
                  <ButtonAgregarTarjeta selectedCard={selectedCard} handleCardSelection={handleCardSelection} />

                </div>
              )}
              {cards.length >= maxCardLimit && (
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
