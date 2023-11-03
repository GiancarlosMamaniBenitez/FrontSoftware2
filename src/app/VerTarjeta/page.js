'use client'




import React, { useState, useEffect } from 'react';
import MenuNuevo from '@/Components/MenuNuevo';
import ButtonAgregarTarjeta from '@/Components/ButtonAgregarTarjeta';
import './tarjeta.css';
import EliminarTarjeta from '@/Components/EliminarTarjeta.jsx';
import EditarTarjeta from '@/Components/EditarTarjeta.jsx'; 
import NavBar from '@/Components/NavBar';
function VerTarjeta() {
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(''); 
  const maxCardLimit = 5;
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sesion , setSesion] = useState({});
  useEffect(() => {
    // Verifica si el usuario ha iniciado sesión
    let sesionGuardada = localStorage.getItem("sesion");
        if(sesionGuardada == undefined){
          
            router.push('/')
        }
        setSesion(JSON.parse(sesionGuardada))
        console.log(sesion)
  }, []);
  useEffect(() => {
    // Cargar las tarjetas del usuario desde currentUser
    if (currentUser && currentUser.cards) {
      setUserCards(currentUser.cards);
    }
  }, [currentUser]);
  const handleCardSelection = (cardType) => {
    setSelectedCard(cardType); // Actualiza selectedCard al seleccionar una tarjeta
  };

  const deleteCard = (cardType) => {
    if (currentUser && currentUser.cards) {
      // Filtra las tarjetas para eliminar la que coincida con cardType
      const updatedCards = currentUser.cards.filter((card) => card.type !== cardType);

      currentUser.cards = updatedCards;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));

      // Actualiza el estado de userCards para reflejar el cambio
      setUserCards(updatedCards);
    }
  };

  const editCard = (cardId) => {
    window.location.href = `/Edit-card?id=${cardId}`;
  };

  return (
    <div>
       <NavBar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} sesion={sesion}/>
      <div className={`container${isSidebarOpen ? '-shifted' : ''}`}>
      <div className="Agregar">
        <h1>TARJETAS REGISTRADAS</h1>
        <div>
          {userCards && userCards.length > 0 ? (
            <div>
              <h2>¿Desea eliminar alguna tarjeta o ver más detalles?</h2>
              <div className="card-container">
                {userCards.map((card, index) => (
                  <div key={index} className="card-option">
                    <div className="card-image-container">
                      <img src={`/${card.type}.png`} alt={card.type} className="card-image" />
                      <EliminarTarjeta cardType={card.type} onDeleteCard={deleteCard} />
                      <EditarTarjeta cardId={card.id} onEditCard={editCard} />
                      
                    </div>
                  </div>
                ))}
              </div>
              {userCards.length < maxCardLimit && (
                <div>
                  <h2>¿Qué tipo de tarjeta desea registrar?</h2>
                  <ButtonAgregarTarjeta selectedCard={selectedCard} handleCardSelection={handleCardSelection} />

                </div>
              )}
              {userCards.length >= maxCardLimit && (
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