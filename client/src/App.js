import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapLoader from './components/Map/MapLoader';
import Home from './components/Pages/Home';
import HeroSection from './components/HeroSection';
import MessagingPage from './components/Messaging/MessagingPage';
import Footer from './components/Footer';
import MapPage from './components/Pages/MapPage';

function App() {
  return (
    <>
      <Router>

        <Navbar />
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/chat' element={<MessagingPage />}/>
          <Route path='/map' element={<MapPage/>} />

        </Routes>
        <Footer />

      </Router>
    </>
  );
}

export default App;
