import React from "react";
import Link from "next/link";
import './sidebar.css'
function SideBar(){
  return (
    <div>
      <ul className="sidebar">
      <li><Link href='/add-card' className="link-sidebar">Add a card</Link></li>
        <li><Link href='/IngresosGastos' className="link-sidebar">Add an expense</Link></li>
        <li><Link href='/add-card' className="link-sidebar">Add an income</Link></li>
        <li><Link href='/add-card' className="link-sidebar">Monthly Report</Link></li>
       
      </ul>
    </div>
  );
}

export default SideBar;
