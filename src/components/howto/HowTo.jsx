import React from "react";
import "./HowTo.css";

function HowToUse() {
  return (
    <div className="howto-main-container">
      <div className="tutorial-container">
        <div className="tutorial-sidebar">
          <h2>Introduction</h2>
          <h2>Geofences</h2>
          <ul>
            <li>
              <a href="#adding-geofences">Add Geofences</a>
            </li>
            <li>
              <a href="#adding-koz">Add Keep Out Zones</a>
            </li>
            <li>
              <a href="#edit-geofences">Edit Geofences and Keep Out Zones</a>
            </li>
            <li>
              <a href="#remove-geofences">
                Remove Geofences and Keep Out Zones
              </a>
            </li>
          </ul>
          <h2>Markers</h2>
          <ul>
            <li>
              <a href="#adding-markers">Add Markers</a>
            </li>
            <li>
              <a href="#remove-markers">Delete Markers</a>
            </li>
            <li>
              <a href="#remove-all-markers">Delete All Markers</a>
            </li>
          </ul>
          <h2>Downloading Data</h2>
          <p>
            <a href="#download-json">Download JSON</a>
          </p>
        </div>
        <div className="tutorial-content">
          <h1>Welcome to the GeoFences & Markers Web App Tutorial!</h1>
          <h2>Geofences</h2>
          <div id="adding-geofences">
            <h3>Add Geofences</h3>
            <p>
              To add a geofence, click on the "Handle Geofences" button on the
              sidebar. Then, click on the pentagon icon to start setting the
              vertices of your geofence on the map. Once you've created the
              desired shape, the geofence will be displayed on the map.
            </p>
            <img
              src="examples/add-geofences.jpg"
              alt="Adding Geofences Screenshot"
            />
            <img
              src="examples/adding-geofence.jpg"
              alt="Adding Geofence Screenshot"
            />
          </div>
          <div id="adding-koz">
            <h3>Add Keep Out Zones</h3>
            <p>
              Similar to adding geofences, you can add keep out zones by
              selecting the "Add Keep Out Zone" button from the sidebar. Keep
              out zones function similarly to geofences but are used to
              designate areas where access is restricted. Follow the same steps
              as adding geofences to create your keep out zones.
            </p>
            <img
              src="examples/add-koz.jpg"
              alt="Adding Keep Out Zones Screenshot"
            />
          </div>
          <div id="edit-geofences">
            <h3>Edit Geofences and Keep Out Zones</h3>
            <p>
              To edit a geofence or keep out zone, Simply click on the edit icon
              button in the top right corner of the map, and you can move the
              vertices of the shape to adjust as necessary.
            </p>
            <img
              src="examples/edit-geofences.jpg"
              alt="Edit Geofences Screenshot"
            />
          </div>
          <div id="remove-geofences">
            <h3>Remove Geofences and Keep Out Zones</h3>
            <p>
              To delete a geofence, click on the trash icon button at the top
              right corner of the map. Then, click on the geofence you want to
              delete. After selecting the geofence you want to delete and
              removing it from the map, don't forget to click the Save button to
              apply the changes. This ensures that your modifications are
              preserved. Additionally, if you need to delete all geofences and
              Keep Out Zones from the map, simply click on the 'Clear All'
              button.
            </p>
            <img
              src="examples/remove-geofences.jpg"
              alt="Deleting Geofences Screenshot"
            />
          </div>
          <h2>Markers</h2>
          <div id="adding-markers">
            <h3>Add Markers</h3>
            <p>
              To add markers, simply click on the "Handle Markers" button on the
              sidebar, and then click on the map to place them within the
              defined geofences. Please note that markers cannot be placed
              within keep out zones, as they are restricted areas. You will only
              be able to place markers within the geofences.
            </p>
            <img
              src="examples/add-marker.jpg"
              alt="Adding Markers Screenshot"
            />
          </div>
          <div id="remove-markers">
            <h3>Delete Markers</h3>
            <p>
              You can remove markers by selecting the "Remove a marker" option.
              Then, click on the marker you want to delete. After selecting the
              marker.
            </p>
            <img
              src="examples/remove-marker.jpg"
              alt="Deleting Markers Screenshot"
            />
          </div>
          <div id="remove-all-markers">
            <h3>Remove All Markers</h3>
            <p>
              If you need to delete all markers from the map, simply click on
              the "Remove All Markers" button from the sidebar.
            </p>
            <img
              src="examples/remove-all-markers.jpg"
              alt="Deleting All Markers Screenshot"
            />
          </div>
          <div id="download-json">
            <h2>Download Data</h2>
            <p>
              Finally, you can download all the Geofences, Keep Out Zones and
              Markers data in JSON format. Click on the "Download JSON" button
              from the sidebar to export the data.
            </p>
            <img
              src="examples/download-json.jpg"
              alt="Downloading JSON Screenshot"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToUse;
