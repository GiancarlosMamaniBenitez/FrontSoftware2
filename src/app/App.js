import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // o cualquier otro componente raíz de tu aplicación
import VerticalMenu from './Components/VerticalMenu';

const App = () => {
    return (
      <Router>
        <Routes>
        <NavBar/>
        </Routes>
      </Router>
    );
  }
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(<App />, rootElement);