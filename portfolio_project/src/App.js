import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

//import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Home from './Pages/Home/Homescreen'
import Portfolio from './Pages/Home/Portfolio'
import ProjectsProvider from './services/ProjectsContext'

function App() {

  return (
    <div className="App">

        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/portfolio" element={<ProjectsProvider><Portfolio/></ProjectsProvider>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
