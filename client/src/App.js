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
import MyDates from './components/MyDates/MyDates';
import TestedPositive from './components/TestedPositive/TestedPositive';

function App() {
  return (
    <>
      <Router>

        <Navbar />
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/chat' element={<MessagingPage />}/>
          <Route path='/map' element={<MapPage/>} />
          <Route path='/view-dates' element={<MyDates/>} />
          <Route path='/test-positive' element={<TestedPositive/>} />
        </Routes>
        <Footer />

      </Router>
    </>
  );
}

export default App;
