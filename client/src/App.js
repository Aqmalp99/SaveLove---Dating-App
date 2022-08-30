import { Link, Route, Routes } from "react-router-dom";
import "./index.css";
import TestComponent from "./components/TestComponent/TestComponent";
import MapLoader from "./components/Map/MapLoader";
import HomePage from "./components/Home/HomePage";

function App() {
  return (

    <>
    <nav>
      <ul> 
      <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/test">TestComponent</Link>
        </li>
        <li>
          <Link to="/map">MapLoader</Link>
        </li>
      </ul>
    </nav>
    <Routes>
      <Route path="/" element={<LoginLogic />} />
      <Route path="/test " element={<TestComponent />} />
      <Route path="/map" element={<MapLoader />} />
      
    </Routes>
    </>

  );
}

export default App;
