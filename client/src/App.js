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
import Login from './components/Pages/Login';
import Signup from './components/Pages/Signup';
import Register from './components/Pages/Register';


function App() {
  return (
    <>
      <Router>

        <Navbar />
        <Routes>

          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
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
