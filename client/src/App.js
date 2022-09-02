import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapLoader from './components/Map/MapLoader';
import Home from './components/HomePage/Home';
import HeroSection from './components/HeroSection';
import MessagingPage from './components/Messaging/MessagingPage';

function App() {
  return (
    <>
      <Router>

        <Navbar />
        <HeroSection />
        <Routes>

          <Route path='/' exact  />
          <Route path='/chat' element={<MessagingPage />}/>
          <Route path='/map' element={<MapLoader />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
