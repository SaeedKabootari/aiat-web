// import React, { useState, useEffect } from "react";
// import ReactEChartsCore from "echarts-for-react/lib/core";
// import * as echarts from "echarts/core";
// import { GridComponent } from "echarts/components";
// import { BarChart, MapChart } from "echarts/charts";
// import { UniversalTransition } from "echarts/features";
// import { CanvasRenderer } from "echarts/renderers";
// import iranJson from "../../../src/assets/iran.json"; // Adjust path based on your project structure

// // Register ECharts components
// echarts.use([
//   GridComponent,
//   BarChart,mergeFeatures
//   MapChart,
//   CanvasRenderer,
//   UniversalTransition,
// ]);

// // Population data
// // const populationData = props.populationData.sort((a, b) => a.value - b.value);

// // Map and Bar chart options
// const getMapOption = (data) => ({
//   visualMap: {
//     left: "right",
//     min: 0,
//     max: 3000, // Adjusted for Iranian data range
//     inRange: {
//       color: [
//         "#313695",
//         "#4575b4",
//         "#74add1",
//         "#abd9e9",
//         "#e0f3f8",
//         "#ffffbf",
//         "#fee090",
//         "#fdae61",
//         "#f46d43",
//         "#d73027",
//         "#a50026",
//       ],
//     },
//     text: ["High", "Low"],
//     calculable: true,
//   },
//   series: [
//     {
//       id: "population",
//       type: "map",
//       roam: true,
//       map: "Iran",
//       animationDurationUpdate: 1000,
//       universalTransition: true,
//       data: data,
//     },
//   ],
// });

// const getBarOption = (data) => ({
//   xAxis: {
//     type: "value",
//   },
//   yAxis: {
//     type: "category",
//     axisLabel: {
//       rotate: 30,
//     },
//     data: data.map((item) => item.name),
//   },
//   animationDurationUpdate: 1000,
//   series: [
//     {
//       type: "bar",
//       id: "population",
//       data: data.map((item) => item.value),
//       universalTransition: true,
//     },
//   ],
// });

// const IRANPopulationChart = ({ populationData }) => {
//   // Population data
//   const sortedData = [...populationData].sort((a, b) => a.value - b.value);

//   const [currentOption, setCurrentOption] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMapView, setIsMapView] = useState(true); // State to track current view

// // Initialize map and update chart when populationData changes
//   useEffect(() => {
//     try {
//       // Register Iran map
//       console.log("Registering Iran map with GeoJSON:", iranJson);
//       echarts.registerMap("Iran", iranJson);

//       // Only set options if populationData is non-empty
//       if (populationData.length > 0) {
//         console.log("Updating chart with populationData:", populationData);
//         setCurrentOption(isMapView ? getMapOption(populationData) : getBarOption(sortedData));
//       }
//       setLoading(false);
//     } catch (err) {
//       console.error("Error registering map or setting options:", err);
//       setError("Failed to load map data");
//       setLoading(false);
//     }
//   }, [populationData, isMapView]); // Add populationData and isMapView to dependencies

//   // Toggle between map and bar chart on button click
//   const handleToggleChart = () => {
//     setIsMapView((prev) => {
//       const newOption = prev
//         ? getBarOption(sortedData)
//         : getMapOption(populationData);
//       setCurrentOption(newOption);
//       return !prev;
//     });
//   };

//   //   const handleToggleChart = () => {
//   //     console.log("Toggling chart, current isMapView:", isMapView);
//   //     setIsMapView((prev) => !prev);
//   //   };

//   // Toggle between map and bar every 2 seconds
//   //   useEffect(() => {
//   //     if (!currentOption || !currentOption.series || !currentOption.series[0]) {
//   //       console.warn('Toggle skipped: currentOption is not ready');
//   //       return;
//   //     }
//   //     console.log('Current chart type:', currentOption.series[0].type);
//   //     const interval = setInterval(() => {
//   //       setCurrentOption(prev => {
//   //         if (!prev || !prev.series || !prev.series[0]) {
//   //           console.warn('Toggle skipped: prev is invalid');
//   //           return prev;
//   //         }
//   //         const newOption = prev.series[0].type === 'map'
//   //           ? getBarOption(populationData)
//   //           : getMapOption(populationData);
//   //         console.log('Switching to:', newOption.series[0].type);
//   //         return newOption;
//   //       });
//   //     }, 2000);
//   //     return () => clearInterval(interval);
//   //   }, [currentOption]);

//   return (
//     <div className="w-full h-full pr-4 pt-4 bg-gray-100">
//       {loading ? (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-lg font-semibold">Loading...</p>
//         </div>
//       ) : error ? (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-lg font-semibold text-red-500">{error}</p>
//         </div>
//       ) : !currentOption ? (
//         <div className="flex items-center justify-center h-full">
//           <p className="text-lg font-semibold text-red-500">
//             Error: Unable to load chart
//           </p>
//         </div>
//       ) : (
//         <div className="relative w-full h-full">
//           <ReactEChartsCore
//             echarts={echarts}
//             option={currentOption}
//             style={{ height: "100%", width: "100%" }}
//             notMerge={true}
//             className="bg-white rounded-lg shadow-md"
//           />

//           <button
//             onClick={handleToggleChart}
//             className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm cursor-pointer z-10"
//           >
//             {isMapView ? "نمایش نمودار میله ای" : "نمایش نمودار نقشه ای"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default IRANPopulationChart;





import React, { useState, useEffect } from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { GridComponent } from "echarts/components";
import { BarChart, MapChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import iranJson from "../../../src/assets/iran.json"; // Adjust path based on your project structure
import { findMaxByValue } from "../../utils/utils";

// Register ECharts components
echarts.use([
  GridComponent,
  BarChart,
  MapChart,
  CanvasRenderer,
  UniversalTransition,
]);

// Function to merge features with the same name into MultiPolygon
const mergeFeatures = (geojson) => {
  const groups = {};
  geojson.features.forEach((feature) => {
    const name = feature.properties.name; // Assuming 'name' is the property key; adjust if different
    if (!groups[name]) {
      groups[name] = [];
    }
    groups[name].push(feature);
  });

  const newFeatures = [];
  Object.keys(groups).forEach((name) => {
    const feats = groups[name];
    if (feats.length === 1) {
      newFeatures.push(feats[0]);
    } else {
      const coordinates = [];
      feats.forEach((f) => {
        const geo = f.geometry;
        if (geo.type === 'Polygon') {
          coordinates.push(geo.coordinates);
        } else if (geo.type === 'MultiPolygon') {
          coordinates.push(...geo.coordinates);
        }
      });
      const newFeature = {
        type: 'Feature',
        properties: feats[0].properties,
        geometry: {
          type: 'MultiPolygon',
          coordinates: coordinates,
        },
      };
      newFeatures.push(newFeature);
    }
  });

  return { type: 'FeatureCollection', features: newFeatures };
};

// Map and Bar chart options
const getMapOption = (data) => ({
  visualMap: {
    left: "right",
    min: 0,
    max: findMaxByValue(data), // Adjusted for Iranian data range
    inRange: {
      color: [
        "#313695",
        "#4575b4",
        "#74add1",
        "#abd9e9",
        "#e0f3f8",
        "#ffffbf",
        "#fee090",
        "#fdae61",
        "#f46d43",
        "#d73027",
        "#a50026",
      ],
    },
    text: ["High", "Low"],
    calculable: true,
  },
  series: [
    {
      id: "population",
      type: "map",
      roam: true,
      map: "Iran",
      animationDurationUpdate: 1000,
      universalTransition: true,
      data: data,
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ],
});

const getBarOption = (data) => ({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    axisLabel: {
      rotate: 30,
    },
    data: data.map((item) => item.name),
  },
  animationDurationUpdate: 1000,
  series: [
    {
      type: "bar",
      id: "population",
      data: data.map((item) => item.value),
      universalTransition: true,
    },
  ],
});

const IRANPopulationChart = ({ populationData }) => {
  const sortedData = [...populationData].sort((a, b) => a.value - b.value);

  const [currentOption, setCurrentOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapView, setIsMapView] = useState(true); // State to track current view

  // Initialize map and update chart when populationData changes
  useEffect(() => {
    try {
      // Merge features in GeoJSON
      const mergedJson = mergeFeatures(iranJson);
      console.log("Registering Iran map with merged GeoJSON:", mergedJson);
      echarts.registerMap("Iran", mergedJson);

      // Only set options if populationData is non-empty
      if (populationData.length > 0) {
        console.log("Updating chart with populationData:", populationData);
        setCurrentOption(isMapView ? getMapOption(populationData) : getBarOption(sortedData));
      }
      setLoading(false);
    } catch (err) {
      console.error("Error registering map or setting options:", err);
      setError("Failed to load map data");
      setLoading(false);
    }
  }, [populationData, isMapView]); // Add populationData and isMapView to dependencies

  // Toggle between map and bar chart on button click
  const handleToggleChart = () => {
    setIsMapView((prev) => {
      const newOption = prev
        ? getBarOption(sortedData)
        : getMapOption(populationData);
      setCurrentOption(newOption);
      return !prev;
    });
  };

  return (
    <div className="w-full h-full pr-4 pt-4 bg-gray-100">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-semibold text-red-500">{error}</p>
        </div>
      ) : !currentOption ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-lg font-semibold text-red-500">
            Error: Unable to load chart
          </p>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <ReactEChartsCore
            echarts={echarts}
            option={currentOption}
            style={{ height: "100%", width: "100%" }}
            notMerge={true}
            className="bg-white rounded-lg shadow-md"
          />

          <button
            onClick={handleToggleChart}
            className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm cursor-pointer z-10"
          >
            {isMapView ? "نمایش نمودار میله ای" : "نمایش نمودار نقشه ای"}
          </button>
        </div>
      )}
    </div>
  );
};

export default IRANPopulationChart;