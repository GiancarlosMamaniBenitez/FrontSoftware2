  // CategoryForm.jsx
  import React from "react";

  const CategoryForm = ({ newCategory, onNewCategoryChange, addNewCategory }) => {
    return (
      <div className="add-category">
        <h3>Categoria</h3>
        <input
          type="text"
          value={newCategory}
          onChange={onNewCategoryChange}
          placeholder="Enter New Category"
        />
        <button className="btn btn-primary" onClick={addNewCategory}>Añadir Categoria</button>
      </div>
    );
  };

  export default CategoryForm;
