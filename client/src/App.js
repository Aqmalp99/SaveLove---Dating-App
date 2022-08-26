import { Route, Routes } from "react-router-dom";
import "./index.css";
import TestComponent from "./components/TestComponent/TestComponent";
import MapLoader from "./components/Map/MapLoader";

function App() {
  return (
    <Routes>
      <Route  exact path="/" element={<TestComponent />} />
      <Route  path="/map" element={<MapLoader />} />
      
    </Routes>
    
  );
}

export default App;
