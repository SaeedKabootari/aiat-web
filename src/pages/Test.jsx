import { MapContainer, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import GeoJSONMap from '../components/Map/GeoJSONMap';
const Test = (props) => {

  return (
    <>
      <div style={{ height: '100vh', width: '100%' }}>
      <MapContainer
        center={[39.75621, -104.99404]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSONMap />
      </MapContainer>
    </div>
    </>
  );
};
export default Test;
