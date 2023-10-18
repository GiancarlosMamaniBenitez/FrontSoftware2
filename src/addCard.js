import React, { useState } from "react";
import "./addCard.css"
const AddCard = () => {
    const [number, setNumber] = useState("");
    const [mm, setMm] = useState("");
    const [yyyy, setYyyy] = useState("");
    const [cvv, setCvv] = useState("");
    const [cardsname, setCardsname] = useState("");
  
    const handleNumberChange = (event) => {
      // Remove non-numeric characters and limit to 16 digits
      const numericValue = event.target.value.replace(/\D/g, "").slice(0, 16);
      const formattedValue = numericValue.replace(/(\d{4})/g, "$1 ");
      setNumber(formattedValue);
    };
  
    const handleMmChange = (event) => {
      // Remove non-numeric characters and limit to 2 digits
      const numericValue = event.target.value.replace(/\D/g, "").slice(0, 2);
      setMm(numericValue);
    };
  
    const handleYyyyChange = (event) => {
      // Remove non-numeric characters and limit to 4 digits
      const numericValue = event.target.value.replace(/\D/g, "").slice(0, 4);
      setYyyy(numericValue);
    };
  
    const handleCvvChange = (event) => {
      // Remove non-numeric characters and limit to 3 digits
      const numericValue = event.target.value.replace(/\D/g, "").slice(0, 3);
      setCvv(numericValue);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Registering new card: " + number + ", MM: " + mm + ", YYYY: " + yyyy + " CVV: " + cvv);
    };
  
    return (
      <div className="addCard-container">
        <h1>Add your card.</h1>
        <hr></hr>
        <input
          className="name-input"
          type="text"
          name="name-card"
          placeholder="Card's name"
          value={cardsname}
          onChange={(event) => setCardsname(event.target.value)}
          
        />
        <hr></hr>
        <input
          className="number-input"
          type="text"
          name="number"
          placeholder="1111 2222 3333 4444"
          value={number}
          onChange={handleNumberChange}
        />
        <hr></hr>
        <table>
            <tr>
                <td><input
          className="MM-input"
          type="text"
          name="mm"
          placeholder="MM"
          value={mm}
          onChange={handleMmChange}
        /></td>
        <td><input
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
        <hr></hr>
        <input
          className="cvv-input"
          type="text"
          name="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCvvChange}
        />
        <hr></hr>
        <button className="add-button" onClick={handleSubmit}>
          Confirm   
        </button>
        
  
        
      </div>
    );
  };
  
  export default AddCard;