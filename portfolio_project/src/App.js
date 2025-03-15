import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

//import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Pages/Home/Homescreen'

function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
