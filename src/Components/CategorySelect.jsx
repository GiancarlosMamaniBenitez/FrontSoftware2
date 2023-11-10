const CategorySelect = ({ selectedCat, userCat, handleSelectedCatChange }) => (
    <select value={selectedCat} onChange={handleSelectedCatChange}>
      <option value="">Selecciona una categoria</option>
      {userCat.map((cat,index) => (
        <option key={cat.id} value={cat.nombre}>
          {cat.nombre}
        </option>
      ))}
    </select>
  );
  export default CategorySelect;