import React from "react";

const MetaIngreso = ({
  Meta,
  handleMetaChange,
  onSaveClick
}) => {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
      <div className="d-block ">
      <h3>Meta de Ingresos:</h3>
      <input
        type="number"
        value={Meta}
        onChange={handleMetaChange}
        placeholder="Enter Spending Limit"
      />
      </div>

      <button className="btn btn-primary w-100 my-3" onClick={onSaveClick}>Añadir Meta</button>
    </div>
  );
};

export default MetaIngreso;