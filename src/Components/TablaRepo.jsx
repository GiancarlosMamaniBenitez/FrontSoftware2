// ReportTable.js
import React from "react";
import { faChartSimple } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const TablaRepo = ({ usuarioRepo, generateReportPDF,eliminar }) => {
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
            <th>ELiminar</th>
            <th>Graficos</th>
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
              <td>
                        <button className="btn btn-primary" onClick={() => generateReportPDF(report)}>
                        <FontAwesomeIcon icon={faChartSimple} style={{ color: 'black' }} />
                        </button>
                        
                      </td>
              <td>
              <button className="btn btn-primary" onClick={() => eliminar(report)}>
              <FontAwesomeIcon icon={faTrash}   style={{ color: 'black' }} />
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
