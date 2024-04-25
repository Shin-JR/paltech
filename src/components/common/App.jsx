import "./App.css";
import Map from "../map/Map";
import { useState } from "react";

function App() {
  const [geofences, setGeofences] = useState([])
  

  return (
    <div className="main-container">
      <div className="app-container">
        <div className="sidebar">
          <h1>hola</h1>
        </div>
        <div className="map-div">
          <Map/>
        </div>
      </div>
    </div>
  );
}

export default App;
