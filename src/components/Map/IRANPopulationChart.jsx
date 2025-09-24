import React, { useState, useEffect } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart, MapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import iranJson from '../../../src/assets/iran.json'; // Adjust path based on your project structure

// Register ECharts components
echarts.use([GridComponent, BarChart, MapChart, CanvasRenderer, UniversalTransition]);

// Population data
const populationData = [
  { name: 'مازندران', value: 1056 },
  { name: 'خراسان رضوی', value: 2027 },
  { name: 'فارس', value: 1195 },
  { name: 'زنجان', value: 260 },
  { name: 'مرکزی', value: 197 },
  { name: 'قزوین', value: 138 },
  { name: 'خوزستان', value: 1581 },
  { name: 'آذربایجان شرقی', value: 621 },
  { name: 'یزد', value: 411 },
  { name: 'اردبیل', value: 429 },
  { name: 'خراسان جنوبی', value: 469 },
  { name: 'کرمانشاه', value: 334 },
  { name: 'اصفهان', value: 2671 },
  { name: 'آذربایجان غربی', value: 251 },
  { name: 'ایلام', value: 198 },
  { name: 'تهران', value: 673 },
  { name: 'سمنان', value: 181 },
  { name: 'چهارمحال و بختیاری', value: 367 },
  { name: 'کهگیلویه و بویراحمد', value: 229 },
  { name: 'گلستان', value: 1456 },
  { name: 'همدان', value: 330 },
  { name: 'بوشهر', value: 315 },
  { name: 'لرستان', value: 561 },
  { name: 'هرمزگان', value: 1343 },
  { name: 'سیستان و بلوچستان', value: 800 },
  { name: 'گیلان', value: 35 },
  { name: 'کرمان', value: 904 },
  { name: 'البرز', value: 306 },
  { name: 'کردستان', value: 84 },
  { name: 'خراسان شمالی', value: 286 },
  { name: 'قم', value: 266 }
].sort((a, b) => a.value - b.value);

// Map and Bar chart options
const getMapOption = (data) => ({
  visualMap: {
    left: 'right',
    min: 0,
    max: 3000, // Adjusted for Iranian data range
    inRange: {
      color: [
        '#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8',
        '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'
      ]
    },
    text: ['High', 'Low'],
    calculable: true
  },
  series: [
    {
      id: 'population',
      type: 'map',
      roam: true,
      map: 'Iran',
      animationDurationUpdate: 1000,
      universalTransition: true,
      data: data
    }
  ]
});

const getBarOption = (data) => ({
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      rotate: 30
    },
    data: data.map(item => item.name)
  },
  animationDurationUpdate: 1000,
  series: [
    {
      type: 'bar',
      id: 'population',
      data: data.map(item => item.value),
      universalTransition: true
    }
  ]
});

const IRANPopulationChart = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register map and initialize chart
  useEffect(() => {
    try {
      console.log('iranJson:', iranJson); // Debug GeoJSON import
      echarts.registerMap('Iran', iranJson);
      setCurrentOption(getMapOption(populationData));
      setLoading(false);
    } catch (err) {
      console.error('Error registering map:', err);
      setError('Failed to load map data');
      setLoading(false);
    }
  }, []);

  // Toggle between map and bar every 2 seconds
//   useEffect(() => {
//     if (!currentOption || !currentOption.series || !currentOption.series[0]) {
//       console.warn('Toggle skipped: currentOption is not ready');
//       return;
//     }
//     console.log('Current chart type:', currentOption.series[0].type);
//     const interval = setInterval(() => {
//       setCurrentOption(prev => {
//         if (!prev || !prev.series || !prev.series[0]) {
//           console.warn('Toggle skipped: prev is invalid');
//           return prev;
//         }
//         const newOption = prev.series[0].type === 'map'
//           ? getBarOption(populationData)
//           : getMapOption(populationData);
//         console.log('Switching to:', newOption.series[0].type);
//         return newOption;
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [currentOption]);

  return (
    <div className="w-full h-[600px] p-4 bg-gray-100">
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
          <p className="text-lg font-semibold text-red-500">Error: Unable to load chart</p>
        </div>
      ) : (
        <ReactEChartsCore
          echarts={echarts}
          option={currentOption}
          style={{ height: '100%', width: '100%' }}
          notMerge={true}
          className="bg-white rounded-lg shadow-md"
        />
      )}
    </div>
  );
};

export default IRANPopulationChart;