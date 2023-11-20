  // CategoryForm.jsx
  import React from "react";

  const OrigenForm = ({ newCategory, onNewCategoryChange, addNewCategory }) => {
    return (
      <div className="add-category">
        <h3>Origen</h3>
        <input
          type="text"
          value={newCategory}
          onChange={onNewCategoryChange}
          placeholder="Ingresa un nuevo origen"
        />
        <button className="btn btn-primary" onClick={addNewCategory}>Añadir Origen</button>
      </div>
    );
  };

  export default OrigenForm;