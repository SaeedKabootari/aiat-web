import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import L from "leaflet";

const GeoJSONMap = (props) => {
  // Different styles for different geometry types
  const style = (feature) => {
    switch (feature.geometry.type) {
      case "Point":
        return {
          color: "#ff7800",
          weight: 2,
          opacity: 0.8,
          fillColor: "#ff7800",
          fillOpacity: 0.4,
          radius: 6,
        };
      case "Polygon":
        return {
          color: "#3388ff",
          weight: 2,
          opacity: 0.8,
          fillColor: "#3388ff",
          fillOpacity: 0.4,
        };
      default:
        return {
          color: "#3388ff",
          weight: 2,
          opacity: 0.8,
          fillColor: "#3388ff",
          fillOpacity: 0.4,
        };
    }
  };

  // Create popup for each feature
  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <div>
          <h3>${feature.properties.name}</h3>
          <p>Type: ${feature.properties.type}</p>
          <p>${feature.properties.description}</p>
        </div>
      `;
      layer.bindPopup(popupContent);
    }
  };

  // Convert Point features to circle markers
  const pointToLayer = (feature, latlng) => {
    if (feature.geometry.type === "Point") {
      return L.circleMarker(latlng, style(feature));
    }
    return L.marker(latlng);
  };

  return (
    <MapContainer
      center={[39.75621, -104.99404]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={props.geojsonData}
        style={style}
        onEachFeature={onEachFeature}
        pointToLayer={pointToLayer}
      />
    </MapContainer>
  );
};

export default GeoJSONMap;
