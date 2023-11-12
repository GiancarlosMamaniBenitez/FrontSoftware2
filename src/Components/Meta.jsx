
import React from "react";

const MetaForm= ({ newMeta, onNewMetaChange, addNewMeta }) => {
  return (
    <div className="add-income">
       <h3>Meta de ahorro:</h3>
      <input
        type="number"
        value={newMeta}
        onChange={onNewMetaChange}
        placeholder="Ingresa la meta de ahorro "
      />
      <button className="button-container" onClick={addNewMeta}>Agregar meta de ahorro</button>
    </div>
  );
};

export default MetaForm;
