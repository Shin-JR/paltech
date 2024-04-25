import "./App.css";
import Map from "../map/Map";
import { useState } from "react";

function App() {
  const [geofences, setGeofences] = useState([])


  return (
    <div className="main-container">
      <div className="app-container">
        <div className="sidebar">
          <h1>GeoFences</h1>
          <p>
            {JSON.stringify(geofences, null, 2)}
          </p>
        </div>
        <div className="map-div">
          <Map geofences={geofences} setGeofences={setGeofences} />
        </div>
      </div>
    </div>
  );
}

export default App;
