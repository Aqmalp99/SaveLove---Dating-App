import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapLoader from "./components/Map/MapLoader";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact  />
          <Route path="/map" element={<MapLoader />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
