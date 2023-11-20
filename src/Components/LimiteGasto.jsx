import React from "react";

const LimiteGasto = ({
  Limit,
  estadoBoton,
  handleLimitChange,
  onSaveClick
}) => {
  return (
    <div>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
      <div className="d-block ">
      <h3>Limite de gastos</h3>
      <input
        type="number"
        value={Limit}
        onChange={handleLimitChange}
        placeholder="Enter Spending Limit"
      />
      </div>

      <button className="btn btn-primary w-100 my-3" onClick={onSaveClick}>{estadoBoton}</button>
    </div>
  );
};

export default LimiteGasto;
