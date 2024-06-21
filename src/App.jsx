import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Productos from './pages/Productos';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/superhero/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to="/home"  />} />
        <Route path='/home' element={<Home />} />
        <Route path='/productos' element={<Productos />} />
      </Routes>
    </Router>
  );
}

export default App;
