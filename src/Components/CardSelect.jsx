const CardSelect = ({ selectedCard, userCards, handleSelectedCardChange, setSpendingLimit, setSavingsGoal  }) => (
    <select value={selectedCard} onChange={handleSelectedCardChange}>
      <option value="">Select a Card</option>
      {userCards.map((card) => (
        <option key={card.number} value={card.number}>
          {card.cardsname} - {card.number}
        </option>
      ))}
    </select>
  );
  export default CardSelect;

