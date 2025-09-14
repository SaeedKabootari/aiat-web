import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/assets/css/leaflet.css';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom hook for search control
function SearchControl({ onLocationFound }) {
  const map = useMap();
  const provider = new OpenStreetMapProvider();

  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: true,
    showPopup: false,
    autoClose: true,
    retainZoomLevel: false,
    animateZoom: true,
    keepResult: true,
    searchLabel: 'Search for location...',
  });

  React.useEffect(() => {
    map.addControl(searchControl);

    // Listen for search results
    map.on('geosearch/showlocation', (result) => {
      const location = result.location;
      onLocationFound([location.y, location.x]);
    });

    return () => {
      map.removeControl(searchControl);
    };
  }, [map, searchControl, onLocationFound]);

  return null;
}

// Custom component to update map view
function MapUpdater({ center }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const MapWithSearch = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Default position (London)
  const [searchQuery, setSearchQuery] = useState('');

  // Custom icon for fixed pointer
  const customIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const handleLocationFound = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Search Control */}
        <SearchControl onLocationFound={handleLocationFound} />
        
        {/* Fixed Pointer Marker */}
        <Marker position={position} icon={customIcon}>
          <Popup>
            <strong>Selected Location</strong><br />
            Latitude: {position[0].toFixed(6)}<br />
            Longitude: {position[1].toFixed(6)}<br />
            <small>Click search bar above to find new locations</small>
          </Popup>
        </Marker>
        
        {/* Update map center when position changes */}
        <MapUpdater center={position} />
      </MapContainer>
    </div>
  );
};

export default MapWithSearch;