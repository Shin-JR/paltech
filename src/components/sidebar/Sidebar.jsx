/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Sidebar.css";
const Modes = Object.freeze({
  GEOFENCES: 0,
  MARKERS: 1,
});

export default function Sidebar({
  markers,
  setMarkers,
  geofences,
  mode,
  setMode,
  alertMessage,
  setAlertMessage,
}) {
  const [markersToggled, setMarkersToggled] = useState(false);

  const handleGeofenceButtonAction = () => {
    setMarkersToggled(false);
    setMode(Modes.GEOFENCES);
    setAlertMessage("Add a geofence!");
  };
  const handleMarkerButtonAction = () => {
    setMarkersToggled(true);
    setMode(Modes.MARKERS);
    setAlertMessage("Add a marker!");
  };
  const handleDeleteMarkers = () => {
    setMarkers([]);
    setAlertMessage("Markers Deleted!");
  };

  const downloadFile = ({ fileName, fileType }) => {
    const data = {
        geofences: geofences,
        markers: markers,
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], {
      type: fileType,
    });
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToJson = (e) => {
    e.preventDefault();
    downloadFile({
      markers: { a: 0, b: 2 },
      geofences: JSON.stringify(geofences),
      fileName: "paltech.json",
      fileType: "text/json",
    });
  };

  return (
    <>
      {/* <p>
        {JSON.stringify(geofences, null, 2)}
      </p> */}
      <h2>GeoFences & Markers</h2>
      <h3>Mode: {mode === Modes.MARKERS ? "Markers" : "Geofences"}</h3>
      <div className="button-container">
        <div className="mode-buttons-container">
          <button
            className={`add-markers-button ${
              !markersToggled ? "add-markers-button-active" : ""
            }`}
            onClick={handleGeofenceButtonAction}
          >
            Add Geofences
          </button>
          <button
            className={`add-markers-button ${
              markersToggled ? "add-markers-button-active" : ""
            }`}
            onClick={handleMarkerButtonAction}
          >
            Add Markers
          </button>
        </div>
        <button className="delete-markers-button" onClick={handleDeleteMarkers}>
          Delete Markers
        </button>
      </div>
      {alertMessage && <div className="alert-message">{alertMessage}</div>}
      {/* <p>
        {JSON.stringify(geofences, null, 2)}
        </p> */}
      <div className="download-container">
        <p>Download the geofences and markers info!</p>
        <button className="download-button" onClick={exportToJson}>
          Download JSON
        </button>
      </div>
    </>
  );
}
