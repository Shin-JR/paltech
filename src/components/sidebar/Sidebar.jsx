/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Sidebar.css";
import Modes from "../../config/Modes";

export default function Sidebar({
  markers,
  setMarkers,
  geofences,
  mode,
  setMode,
  alertMessage,
  setAlertMessage,
  keepOutZones,
}) {
  const handleGeofenceButtonAction = () => {
    setMode(Modes.GEOFENCES);
    setAlertMessage("Add a geofence!");
  };
  const handleMarkerButtonAction = () => {
    setMode(Modes.MARKERS);
    setAlertMessage("Add a marker!");
  };
  const handleKeepOutZoneButtonAction = () => {
    setMode(Modes.KEEP_OUT_ZONES);
    setAlertMessage("Add a keep out zone!");
  };
  const handleDeleteAllMarkers = () => {
    setMarkers([]);
    setMode(Modes.MARKERS);
    setAlertMessage("Markers Deleted!");
  };
  const handleRemoveMarkerButtonAction = () => {
    setMode(Modes.DELETE_MARKERS);
    setAlertMessage("Remove a marker!");
  };

  const downloadFile = ({ fileName, fileType }) => {
    const data = {
      geofences: geofences,
      markers: markers,
      keepOutZones: keepOutZones,
    };
    const json = JSON.stringify(data, null, 2);
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
      fileName: "paltech.json",
      fileType: "text/json",
    });
  };

  return (
    <>
      <p>{mode}</p>
      <p>{JSON.stringify(markers, null, 2)}</p>
      <h2>GeoFences & Markers</h2>
      <h3>Mode: {mode === Modes.MARKERS ? "Markers" : "Geofences"}</h3>
      <div className="button-container">
        <div className="mode-buttons-container">
          <button
            className={`add-markers-button ${
              (mode === Modes.GEOFENCES || mode === Modes.KEEP_OUT_ZONES)
                ? "add-markers-button-active"
                : ""
            }`}
            onClick={handleGeofenceButtonAction}
          >
            Handle Geofences
          </button>
          <button
            className={`add-markers-button ${
              (mode === Modes.MARKERS || mode === Modes.DELETE_MARKERS) ? "add-markers-button-active" : ""
            }`}
            onClick={handleMarkerButtonAction}
          >
            Handle Markers
          </button>
          {(mode === Modes.GEOFENCES || mode === Modes.KEEP_OUT_ZONES) && (
            <div className="geofence-menu">
              <button
                className={`add-keepoutzones-button ${
                  mode === Modes.GEOFENCES
                    ? "add-keepoutzones-button-active"
                    : ""
                }`}
                onClick={handleGeofenceButtonAction}
              >
                Add stardard Geofence
              </button>
              <button
                className={`add-keepoutzones-button ${
                  mode === Modes.KEEP_OUT_ZONES
                    ? "add-keepoutzones-button-active"
                    : ""
                }`}
                onClick={handleKeepOutZoneButtonAction}
              >
                Add Keep Out Zone
              </button>
            </div>
          )}
          {(mode === Modes.MARKERS || mode === Modes.DELETE_MARKERS) && (
            <div className="geofence-menu">
              <button
                className={`add-keepoutzones-button ${
                  mode === Modes.MARKERS ? "add-keepoutzones-button-active" : ""
                }`}
                onClick={handleMarkerButtonAction}
              >
                Add a marker
              </button>
              <button
                className={`add-keepoutzones-button ${
                  mode === Modes.DELETE_MARKERS
                    ? "add-keepoutzones-button-active"
                    : ""
                }`}
                onClick={handleRemoveMarkerButtonAction}
              >
                Remove a marker
              </button>
              <button
                className="delete-markers-button"
                onClick={handleDeleteAllMarkers}
              >
                Remove All Markers
              </button>
            </div>
          )}
        </div>
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
