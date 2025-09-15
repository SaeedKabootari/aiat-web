import GeoJSONMap from "../components/Map/GeoJSONMap";
const Test = (props) => {
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Coors Field",
          type: "Baseball Stadium",
          description: "This is where the Rockies play!",
        },
        geometry: {
          type: "Point",
          coordinates: [-104.99404, 39.75621],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Central Park",
          type: "Park",
          description: "Beautiful urban park",
        },
        geometry: {
          type: "Point",
          coordinates: [-73.9688, 40.7812],
        },
      },
      {
        type: "Feature",
        properties: {
          name: "Downtown Area",
          type: "Polygon",
          description: "City center area",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-104.995, 39.755],
              [-104.99, 39.755],
              [-104.99, 39.76],
              [-104.995, 39.76],
              [-104.995, 39.755],
            ],
          ],
        },
      },
    ],
  };

  return (
    <>
      <div style={{ height: "100vh", width: "100%" }}>
        <GeoJSONMap geojsonData={geojsonData} />
      </div>
    </>
  );
};
export default Test;
