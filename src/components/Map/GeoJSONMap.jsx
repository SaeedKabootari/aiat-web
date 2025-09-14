import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

const GeoJSONMap = () => {
  // Sample GeoJSON data with multiple features
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Coors Field",
          type: "Baseball Stadium",
          description: "This is where the Rockies play!"
        },
        geometry: {
          type: "Point",
          coordinates: [-104.99404, 39.75621]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Central Park",
          type: "Park",
          description: "Beautiful urban park"
        },
        geometry: {
          type: "Point",
          coordinates: [-73.9688, 40.7812]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Downtown Area",
          type: "Polygon",
          description: "City center area"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-104.995, 39.755],
            [-104.990, 39.755],
            [-104.990, 39.760],
            [-104.995, 39.760],
            [-104.995, 39.755]
          ]]
        }
      }
    ]
  };

  // Different styles for different geometry types
  const style = (feature) => {
    switch (feature.geometry.type) {
      case 'Point':
        return {
          color: '#ff7800',
          weight: 2,
          opacity: 0.8,
          fillColor: '#ff7800',
          fillOpacity: 0.4,
          radius: 6
        };
      case 'Polygon':
        return {
          color: '#3388ff',
          weight: 2,
          opacity: 0.8,
          fillColor: '#3388ff',
          fillOpacity: 0.4
        };
      default:
        return {
          color: '#3388ff',
          weight: 2,
          opacity: 0.8,
          fillColor: '#3388ff',
          fillOpacity: 0.4
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
    if (feature.geometry.type === 'Point') {
      return L.circleMarker(latlng, style(feature));
    }
    return L.marker(latlng);
  };

  return (
    <GeoJSON
      data={geojsonData}
      style={style}
      onEachFeature={onEachFeature}
      pointToLayer={pointToLayer}
    />
  );
};

export default GeoJSONMap;