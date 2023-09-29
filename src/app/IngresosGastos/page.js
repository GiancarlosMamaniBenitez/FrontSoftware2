'use client'
import React from 'react';
import { useState } from 'react';





import ProgressBar from '../../components/ProgressBar.jsx';
import Range from '../../components/Range.jsx';
import CombinedComponent from '../../components/CombinedComponent.jsx';


function MyPage() {

    

  return (
    <div className="container">
        <div className="row ">
            
            <div className="ProgresBar">
                <div>
                    <hi>LIMITE DE GASTOS</hi>
                </div>
                        <CombinedComponent></CombinedComponent>
                        
            </div>
        </div>
    </div>
  );
}

export default MyPage;