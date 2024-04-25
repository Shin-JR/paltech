// import React from "react";
import { MapContainer, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useState } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import {EditControl} from "react-leaflet-draw";

// based on https://github.com/codegeous/react-component-depot/blob/master/src/pages/Leaflet/polygon.js
export default function Map({geofences, setGeofences}) {
  const [center, setCenter] = useState([-33.4372, -70.6506])
  // const [center, setCenter] = useState([47.7364, 10.3235])
  const ZOOM_LEVEL = 15;

  const _onMapClick = (e) => {
    const { latlng } = e;
    
    // Verificar si el clic está dentro de algún geofence
    const isInsideGeofence = geofences.some((geofence) => {
      const polygon = L.polygon(geofence.latlngs);
      return polygon.contains(latlng);
    });

    if (isInsideGeofence) {
      // Permitir agregar el marcador
      // Aquí puedes agregar lógica para agregar el marcador en el estado o hacer lo que necesites
      console.log("Dentro de un geofence");
    } else {
      console.log("Fuera de un geofence");
    }
  };

  const _onCreated = (e) => {
    // console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setGeofences((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0], markers: [] },
      ]);
    }
  };

  const _onEdited = (e) => {
    // console.log(e);
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
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setGeofences((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={ center }
        zoom={ZOOM_LEVEL}
        style={{ height: "100%"}}
        onClick={_onMapClick}
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
                  message: "<strong>Oh snap!</strong> you can't draw that!"
                },
                shapeOptions: {
                  color: "#97009c"
                }
              }
            }
            }
          />
        </FeatureGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            Paltech
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
