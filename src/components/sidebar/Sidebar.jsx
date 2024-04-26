import './Sidebar.css';
const Modes = Object.freeze({ 
    GEOFENCES: 0,  
    MARKERS: 1, 
}); 

export default function Sidebar({markers, setMarkers, geofences, mode, setMode}) {

    return (
    <>
        <h1>GeoFences</h1>
        <h2>Modo: {
            mode === Modes.MARKERS ? "Markers" : "Geofences"
        }
        </h2>
        <div className="button-container">
            <button onClick={() => setMode(Modes.MARKERS)}>Modo Markers</button>
            <button onClick={() => setMode(Modes.GEOFENCES)}>Modo Geofences</button>
            <button onClick={() => setMarkers([])}>Borrar Marcadores</button>
        </div>
        <p>
        {JSON.stringify(geofences, null, 2)}
        </p>

    </>
    );
}