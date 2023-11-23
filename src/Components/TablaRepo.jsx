// ReportTable.js
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';


const TablaRepo = ({ usuarioRepo, generateReportPDF }) => {
  return (
    <div className="table-container">
      <h2 className="table-title">Lista de reportes</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Descargar</th>
          </tr>
        </thead>
        <tbody>
            
          {usuarioRepo.map((report, index) => (
            <tr key={index}>
              <td>{report.id_reportes}</td>
              <td>{report.tipo.trim().toLowerCase() === "daily" ? "Diario" : "Mensual"}</td>
              <td>{report.fecha_reportes}</td>
              <td>
                <button className="btn btn-primary" onClick={() => generateReportPDF(report)}>
                  <FontAwesomeIcon icon={faCircleDown} style={{ color: 'black' }} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaRepo;
