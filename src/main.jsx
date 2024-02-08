import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import BrowserRouter
import App from './App.jsx';
import Card from './Card.jsx';
import Navbar from './Navbar.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Card/>}></Route>
    <Route path='/form' element={<App/>}></Route>
  </Routes>
  </BrowserRouter>
);
