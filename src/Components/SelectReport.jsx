// SelectReport.js
import React from "react";

const SelectReport = ({ selectedCard,selectedDate, reportscard, handleSelectedDateChange }) => {
  // Obtener fechas únicas
  const uniqueDates = [...new Set(reportscard.map((report) => report.fecha_reportes))];

  return (
    <div className="mx-auto">
      <label className="subtituloReporte">Fecha de Reporte:</label>
      <select
        className="form-control"
        value={selectedDate}
        onChange={handleSelectedDateChange}
      >
        <option value="">Seleccione una fecha</option>
        {selectedCard &&
        uniqueDates.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectReport;
