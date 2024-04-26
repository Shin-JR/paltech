/* eslint-disable react/prop-types */
// import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  FeatureGroup
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useState } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { useMapEvents } from "react-leaflet";

// https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
  
  var x = point[0], y = point[1];
  
  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0], yi = vs[i][1];
      var xj = vs[j][0], yj = vs[j][1];
      
      var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
  }
  
  return inside;
};

const Modes = Object.freeze({ 
  GEOFENCES: 0,  
  MARKERS: 1, 
}); 


// based on https://github.com/codegeous/react-component-depot/blob/master/src/pages/Leaflet/polygon.js
export default function Map({ markers, setMarkers, geofences, setGeofences, mode, setMode }) {
  const [center, setCenter] = useState([-33.4372, -70.6506]);
  const [selectedGeofence, setSelectedGeofence] = useState(null);
  const [selectedColor, setSelectedColor] = useState("#ff0000");
  const ZOOM_LEVEL = 15;

  const _onCreated = (e) => {
    const { layerType, layer } = e;
    console.log(e);
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;
      setGeofences((layers) => [
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
        ...layers,
      ]);
    }
  };

  const _onEdited = (e) => {
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      setGeofences((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    // console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setGeofences((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };


  const Actions = () => {
    if (mode === Modes.MARKERS) {
      useMapEvents({
        click(e) {
          const markerCoords = [e.latlng.lat, e.latlng.lng];
          const insideGeofence = geofences.some((geofence) => {
            const latlngs = geofence.latlngs.map((point) => [point.lat, point.lng]);
            return inside(markerCoords, latlngs);
          });

          const geofenceCount = geofences.filter((geofence) => {
            const latlngs = geofence.latlngs.map((point) => [point.lat, point.lng]);
            return inside(markerCoords, latlngs);
          }).length;
          if (insideGeofence && geofenceCount % 2 == 1) {
            setMarkers((prevMarkers) => [...prevMarkers, e.latlng]);
          } else if (insideGeofence && geofenceCount % 2 == 0) {
            alert("You are in a red zone, you can't add a marker here.");
          } else {
            alert("Out of a Geofence!\nYou have to be inside a Geofence to add a marker.");
          }
        },
      });
    }

    if (mode === Modes.GEOFENCES) {
      useMapEvents({
        click(e) {
          const clickCoords = [e.latlng.lat, e.latlng.lng];

          const clickedGeofence = geofences.find((geofence) => {
            const latlngs = geofence.latlngs.map((point) => [point.lat, point.lng]);
            return inside(clickCoords, latlngs);
          });
          // console.log(clickedGeofence);
        },
      });
    }

    return (
      <>
        {
        markers.map((marker, index) => (
          <Marker key={index} position={marker} interactive={false}>
          </Marker>
        ))
        }
      </>
    )
  };

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ height: "100%" }}
      >
        <FeatureGroup>
          <EditControl
            position="topright"
            onCreated={_onCreated}
            onEdited={_onEdited}
            onDeleted={_onDeleted}
            draw={{
              rectangle: false,
              circle: false,
              circlemarker: false,
              polyline: false,
              marker: false,
              polygon: {
                allowIntersection: true,
                drawError: {
                  color: "#F1F100",
                  message: "<strong>Oh snap!</strong> you can't draw that!",
                },
                shapeOptions: {
                  color: selectedColor,
                },
              },
            }}
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Actions />
      </MapContainer>
    </div>
  );
}
