// src/components/InteractiveMap.js

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- FIX FOR BROKEN MARKER ICON ---
// Manually import the marker icons and shadow
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Merge the options to fix the broken default icon path issue
let DefaultIcon = L.icon({
    iconUrl: icon,
    iconRetinaUrl: iconRetina,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- END OF FIX ---


const InteractiveMap = ({ locations, onLocationClick }) => {
  // Center of the map, focusing on the Mumbai Metropolitan Region
  const mapCenter = [19.11, 72.9];

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-1">
      <MapContainer 
        center={mapCenter} 
        zoom={10} 
        style={{ height: '500px', width: '100%', borderRadius: '0.5rem' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map(location => (
          <Marker 
            key={location.id} 
            // Corrected property names: lat and lng
            position={[location.lat, location.lng]}
            eventHandlers={{ click: () => onLocationClick && onLocationClick(location) }}
          >
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-base mb-1">{location.name}</h3>
                <p className="text-sm">
                  Concentration: 
                  {/* Corrected property name: concentration */}
                  <span className="font-semibold"> {location.concentration} μg/L</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Updated: {new Date(location.lastUpdate).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;