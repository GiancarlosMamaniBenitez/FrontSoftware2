
import React from "react";

const LimiteForm= ({ newLimit, onNewLimitChange, addNewLimit }) => {
  return (
    <div className="add-income">
       <h3>Limite de gastos:</h3>
      <input
        type="number"
        value={newLimit}
        onChange={onNewLimitChange}
        placeholder="Ingresa el limite de gastos"
      />
      <button className="button-container" onClick={addNewLimit}>Agregar limite de ahorro</button>
    </div>
  );
};

export default LimiteForm;
