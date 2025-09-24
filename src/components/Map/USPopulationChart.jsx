import React, { useState, useEffect } from 'react';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart, MapChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import usaJson from '../../../src/assets/USA.json'; // Adjust path based on your project structure

// Register ECharts components
echarts.use([GridComponent, BarChart, MapChart, CanvasRenderer, UniversalTransition]);

// Population data
const populationData = [
  { name: 'Alabama', value: 4822023 },
  { name: 'Alaska', value: 731449 },
  { name: 'Arizona', value: 6553255 },
  { name: 'Arkansas', value: 2949131 },
  { name: 'California', value: 38041430 },
  { name: 'Colorado', value: 5187582 },
  { name: 'Connecticut', value: 3590347 },
  { name: 'Delaware', value: 917092 },
  { name: 'District of Columbia', value: 632323 },
  { name: 'Florida', value: 19317568 },
  { name: 'Georgia', value: 9919945 },
  { name: 'Hawaii', value: 1392313 },
  { name: 'Idaho', value: 1595728 },
  { name: 'Illinois', value: 12875255 },
  { name: 'Indiana', value: 6537334 },
  { name: 'Iowa', value: 3074186 },
  { name: 'Kansas', value: 2885905 },
  { name: 'Kentucky', value: 4380415 },
  { name: 'Louisiana', value: 4601893 },
  { name: 'Maine', value: 1329192 },
  { name: 'Maryland', value: 5884563 },
  { name: 'Massachusetts', value: 6646144 },
  { name: 'Michigan', value: 9883360 },
  { name: 'Minnesota', value: 5379139 },
  { name: 'Mississippi', value: 2984926 },
  { name: 'Missouri', value: 6021988 },
  { name: 'Montana', value: 1005141 },
  { name: 'Nebraska', value: 1855525 },
  { name: 'Nevada', value: 2758931 },
  { name: 'New Hampshire', value: 1320718 },
  { name: 'New Jersey', value: 8864590 },
  { name: 'New Mexico', value: 2085538 },
  { name: 'New York', value: 19570261 },
  { name: 'North Carolina', value: 9752073 },
  { name: 'North Dakota', value: 699628 },
  { name: 'Ohio', value: 11544225 },
  { name: 'Oklahoma', value: 3814820 },
  { name: 'Oregon', value: 3899353 },
  { name: 'Pennsylvania', value: 12763536 },
  { name: 'Rhode Island', value: 1050292 },
  { name: 'South Carolina', value: 4723723 },
  { name: 'South Dakota', value: 833354 },
  { name: 'Tennessee', value: 6456243 },
  { name: 'Texas', value: 26059203 },
  { name: 'Utah', value: 2855287 },
  { name: 'Vermont', value: 626011 },
  { name: 'Virginia', value: 8185867 },
  { name: 'Washington', value: 6897012 },
  { name: 'West Virginia', value: 1855413 },
  { name: 'Wisconsin', value: 5726398 },
  { name: 'Wyoming', value: 576412 },
  { name: 'Puerto Rico', value: 3667084 }
].sort((a, b) => a.value - b.value);

// Map and Bar chart options
const getMapOption = (data) => ({
  visualMap: {
    left: 'right',
    min: 500000,
    max: 38000000,
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
      map: 'USA',
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

const USPopulationChart = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Register map and initialize chart
  useEffect(() => {
    try {
      echarts.registerMap('USA', usaJson, {
        Alaska: { left: -131, top: 25, width: 15 },
        Hawaii: { left: -110, top: 28, width: 5 },
        'Puerto Rico': { left: -76, top: 26, width: 2 }
      });
      setCurrentOption(getMapOption(populationData));
      setLoading(false);
    } catch (err) {
      console.error('Error registering map:', err);
      setError('Failed to load map data');
      setLoading(false);
    }
  }, []);

  // Toggle between map and bar every 2 seconds
  useEffect(() => {
    if (!currentOption || !currentOption.series || !currentOption.series[0]) {
      console.warn('Toggle skipped: currentOption is not ready');
      return;
    }
    console.log('Current chart type:', currentOption.series[0].type);
    const interval = setInterval(() => {
      setCurrentOption(prev => {
        if (!prev || !prev.series || !prev.series[0]) {
          console.warn('Toggle skipped: prev is invalid');
          return prev;
        }
        const newOption = prev.series[0].type === 'map'
          ? getBarOption(populationData)
          : getMapOption(populationData);
        console.log('Switching to:', newOption.series[0].type);
        return newOption;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [currentOption]);

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

export default USPopulationChart;