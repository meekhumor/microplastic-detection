import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const InteractiveMap = ({ locations, onLocationClick }) => {
  return (
    <MapContainer 
      center={[19.2183, 72.9781]} 
      zoom={11} 
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      {locations.map(location => (
        <Marker 
          key={location.id} 
          position={[location.latitude, location.longitude]}
          eventHandlers={{ click: () => onLocationClick(location) }}
        >
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>Concentration: {location.latest_reading} μg/L</p>
              <p>Last Updated: {location.last_update}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default InteractiveMap;