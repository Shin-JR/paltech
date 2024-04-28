/* eslint-disable react/prop-types */
// import React from "react";
import { MapContainer, TileLayer, Marker, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { useState } from "react";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import { useMapEvents } from "react-leaflet";
import { useEffect } from "react";
import { useRef } from "react";
import Modes from "../../config/Modes";

// https://stackoverflow.com/questions/22521982/check-if-point-is-inside-a-polygon
function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

  var x = point[0],
    y = point[1];

  var inside = false;
  for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    var xi = vs[i][0],
      yi = vs[i][1];
    var xj = vs[j][0],
      yj = vs[j][1];

    var intersect =
      yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

const Colors = Object.freeze({
  GEOFENCES: "#97009c",
  SELECTED_GEOFENCE: "red",
  KEEP_OUT_ZONES: "black",
});

// based on https://github.com/codegeous/react-component-depot/blob/master/src/pages/Leaflet/polygon.js
export default function Map({
  markers,
  setMarkers,
  geofences,
  setGeofences,
  mode,
  setAlertMessage,
  keepOutZones,
  setKeepOutZones,
}) {
  const center = [47.736008114450414, 10.32336067054073];
  const [prevSelectedGeofence, setPrevSelectedGeofence] = useState(null);
  const [geofenceColor, setGeofenceColor] = useState(Colors.GEOFENCES);
  const featureGroupRef = useRef();
  const ZOOM_LEVEL = 15;

  const handleMarkersInsideGeofence = () => {
    let markersInsideGeofence = [];
    if (featureGroupRef.current) {
      const { _layers } = featureGroupRef.current;
      const geofencesArray = [];
      Object.values(_layers).forEach((layer) => {
        const color = layer.options.color;
        const id = layer._leaflet_id;
        const latlngs = layer.getLatLngs()[0];

        if (color === Colors.GEOFENCES || color === Colors.SELECTED_GEOFENCE) {
          geofencesArray.push({ id, latlngs });
        }
      });
      markersInsideGeofence = markers.filter((marker) => {
        const insideGeofence = geofencesArray.some((geofence) => {
          const latlngs = geofence.latlngs.map((point) => [
            point.lat,
            point.lng,
          ]);
          return inside([marker.position.lat, marker.position.lng], latlngs);
        });
        return insideGeofence;
      });
    } else {
      markersInsideGeofence = markers.filter((marker) => {
        const insideGeofence = geofences.some((geofence) => {
          const latlngs = geofence.latlngs.map((point) => [
            point.lat,
            point.lng,
          ]);
          return inside([marker.position.lat, marker.position.lng], latlngs);
        });

        return insideGeofence;
      });
    }

    setMarkers(markersInsideGeofence);
  };

  const handleDeleteMarkers = (marker_selected) => {
    if (mode !== Modes.DELETE_MARKERS) {
      return;
    }
    setMarkers((prevMarkers) =>
      prevMarkers.filter(
        (marker) => marker.position !== marker_selected.position
      )
    );
    setAlertMessage("Marker Removed!");
  };

  const handleGeofencesArray = () => {
    const { _layers } = featureGroupRef.current;
    const geofencesArray = [];
    const keepOutZonesArray = [];

    Object.values(_layers).forEach((layer) => {
      const color = layer.options.color;
      const id = layer._leaflet_id;
      const latlngs = layer.getLatLngs()[0];

      if (color === Colors.GEOFENCES || color === Colors.SELECTED_GEOFENCE) {
        geofencesArray.push({ id, latlngs });
      } else if (color === Colors.KEEP_OUT_ZONES) {
        keepOutZonesArray.push({ id, latlngs });
      }
    });

    setGeofences(geofencesArray.reverse());
    setKeepOutZones(keepOutZonesArray.reverse());
  };

  const _onCreated = (e) => {
    const { layerType, layer } = e;
    const layerColor = layer.options.color;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      if (layerColor === Colors.KEEP_OUT_ZONES) {
        setKeepOutZones((layers) => [
          { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
          ...layers,
        ]);
        setAlertMessage("Keep Out Zone Created!");
      } else if (layerColor === Colors.GEOFENCES) {
        setGeofences((layers) => [
          { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
          ...layers,
        ]);
        setAlertMessage("Geofence Created!");
      }
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
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      setGeofences((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
    setAlertMessage("Geofence Deleted!");
  };

  const Actions = () => {
    useMapEvents({
      click(e) {
        const clickCoords = [e.latlng.lat, e.latlng.lng];
        if (mode === Modes.MARKERS) {
          handleGeofencesArray();
          const { _layers } = featureGroupRef.current;
          const geofencesArray = [];
          const keepOutZonesArray = [];
          Object.values(_layers).forEach((layer) => {
            const color = layer.options.color;
            const id = layer._leaflet_id;
            const latlngs = layer.getLatLngs()[0];

            if (
              color === Colors.GEOFENCES ||
              color === Colors.SELECTED_GEOFENCE
            ) {
              geofencesArray.push({ id, latlngs });
            } else if (color === Colors.KEEP_OUT_ZONES) {
              keepOutZonesArray.push({ id, latlngs });
            }
          });
          const insideGeofence = geofencesArray.some((geofence) => {
            const latlngs = geofence.latlngs.map((point) => [
              point.lat,
              point.lng,
            ]);
            return inside(clickCoords, latlngs);
          });
          const insideKeepOutZone = keepOutZonesArray.some((geofence) => {
            const latlngs = geofence.latlngs.map((point) => [
              point.lat,
              point.lng,
            ]);
            return inside(clickCoords, latlngs);
          });

          if (insideGeofence && !insideKeepOutZone) {
            setMarkers((prevMarkers) => [
              ...prevMarkers,
              { id: JSON.stringify(e.latlng), position: e.latlng },
            ]);
            setAlertMessage("Marker Added!");
          } else if (insideKeepOutZone) {
            setAlertMessage(
              "You are in a keep out zone, you can't add a marker here."
            );
          } else {
            setAlertMessage(
              "Out of a Geofence!\nYou have to be inside a Geofence to add a marker."
            );
          }
        } else if (mode === Modes.GEOFENCES || mode === Modes.KEEP_OUT_ZONES) {
          const clickCoords = [e.latlng.lat, e.latlng.lng];
          if (mode === Modes.GEOFENCES) {
            const { _layers } = featureGroupRef.current;
            const geofencesArray = [];
            Object.values(_layers).forEach((layer) => {
              const color = layer.options.color;
              const id = layer._leaflet_id;
              const latlngs = layer.getLatLngs()[0];

              if (
                color === Colors.GEOFENCES ||
                color === Colors.SELECTED_GEOFENCE
              ) {
                geofencesArray.push({ id, latlngs });
              }
            });
            const clickedGeofence = geofencesArray
              .reverse()
              .find((geofence) => {
                const latlngs = geofence.latlngs.map((point) => [
                  point.lat,
                  point.lng,
                ]);
                return inside(clickCoords, latlngs);
              });

            if (clickedGeofence) {
              const { _layers } = featureGroupRef.current;
              const clickedLayer = _layers[clickedGeofence.id];
              if (prevSelectedGeofence) {
                prevSelectedGeofence.setStyle({ color: Colors.GEOFENCES });
              }
              if (clickedLayer) {
                clickedLayer.setStyle({ color: Colors.SELECTED_GEOFENCE });
                setPrevSelectedGeofence(clickedLayer);
              }
            }
          }
        }
      },
    });

    return (
      <>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            eventHandlers={{
              click: () => handleDeleteMarkers(marker),
            }}
          ></Marker>
        ))}
      </>
    );
  };

  useEffect(() => {
    if (mode === Modes.GEOFENCES) {
      setGeofenceColor(Colors.GEOFENCES);
    } else if (mode === Modes.KEEP_OUT_ZONES) {
      setGeofenceColor(Colors.KEEP_OUT_ZONES);
    }
  }, [mode]);

  useEffect(() => {
    handleMarkersInsideGeofence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geofences]);

  return (
    <div className="map-container">
      <MapContainer
        center={center}
        zoom={ZOOM_LEVEL}
        style={{ height: "100%" }}
      >
        <FeatureGroup ref={featureGroupRef}>
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
                  color: geofenceColor,
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
