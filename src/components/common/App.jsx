import "./App.css";
import Map from "../map/Map";
import Sidebar from "../sidebar/Sidebar";
import { useState } from "react";

function App() {
  const [geofences, setGeofences] = useState([]);
  const [mode, setMode] = useState(0);
  const [markers, setMarkers] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div className="main-container">
      <div className="app-container">
        <div className="sidebar">
          <Sidebar
            markers={markers}
            setMarkers={setMarkers}
            geofences={geofences}
            mode={mode}
            setMode={setMode}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        </div>
        <div className="map-div">
          <Map
            markers={markers}
            setMarkers={setMarkers}
            geofences={geofences}
            setGeofences={setGeofences}
            mode={mode}
            setMode={setMode}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
