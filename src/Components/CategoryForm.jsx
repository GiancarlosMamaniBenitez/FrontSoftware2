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
      <button onClick={addNewCategory}>Add Category</button>
    </div>
  );
};

export default CategoryForm;
