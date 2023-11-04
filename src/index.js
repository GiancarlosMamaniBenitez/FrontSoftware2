import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home.js';
import Login from './login.js';
import ReactDOM from 'react-dom';
import Terms from './terms';
import SignUp from './signup';
import reportWebVitals from './reportWebVitals';
import Congratulations from './congrats';
import AddCard from './app/Add-card/page';
import NavBar from './Components/NavBar';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
     
      <Route path="/" caseSensitive={false} element={<Login />} />
      <Route path="/signup" caseSensitive={false} element={<SignUp />} />
      <Route path="/home" caseSensitive={false} element={<Home/>} />
      <Route path="/add-card" caseSensitive={false} element={<AddCard/>} />
      <Route path="/congrats" caseSensitive={false} element={<Congratulations/>}/>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
