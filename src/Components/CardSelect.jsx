const CardSelect = ({ selectedCard, userCards, handleSelectedCardChange }) => (
    <>
    <select className = "form-select" value={selectedCard} onChange={handleSelectedCardChange}>
      
      <option value="">Selecciona tu tarjeta</option>
      {userCards.map((card) => (
        <option key={card.number} value={card.number}>
          {card.cardType} - {card.number}
        </option>
      ))}
    </select>
    </>
  );
  export default CardSelect;

