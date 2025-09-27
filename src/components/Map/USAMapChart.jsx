import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { MapChart, BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { UniversalTransition } from 'echarts/features';

echarts.use([
  MapChart,
  BarChart,
  GridComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
  UniversalTransition,
]);

const USAMapChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize the chart
    chartInstance.current = echarts.init(chartRef.current);

    // Load USA map data
    const loadData = async () => {
      try {
        chartInstance.current.showLoading();
        const response = await fetch('https://echarts.apache.org/examples/data/asset/geo/USA.json');
        if (!response.ok) throw new Error('Failed to load USA map data');
        const usaJson = await response.json();
        chartInstance.current.hideLoading();

        // Register the map with custom positioning
        echarts.registerMap('USA', usaJson, {
          Alaska: { left: -131, top: 25, width: 15 },
          Hawaii: { left: -110, top: 28, width: 5 },
          'Puerto Rico': { left: -76, top: 26, width: 2 },
        });

        // Sample population data (sorted by value for bar chart)
        const data = [
          { name: 'Alabama', value: 4822023 },
          { name: 'Alaska', value: 731449 },
          // ... (include all your data here; omitted for brevity)
          { name: 'Wyoming', value: 576412 },
          { name: 'Puerto Rico', value: 3667084 },
        ].sort((a, b) => a.value - b.value);

        const mapOption = {
          visualMap: {
            left: 'right',
            min: 500000,
            max: 38000000,
            inRange: {
              color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026'],
            },
            text: ['High', 'Low'],
            calculable: true,
          },
          series: [
            {
              id: 'population',
              type: 'map',
              roam: true,
              map: 'USA',
              animationDurationUpdate: 1000,
              universalTransition: true,
              data: data,
            },
          ],
        };

        const barOption = {
          xAxis: { type: 'value' },
          yAxis: {
            type: 'category',
            axisLabel: { rotate: 30 },
            data: data.map((item) => item.name),
          },
          animationDurationUpdate: 1000,
          series: {
            type: 'bar',
            id: 'population',
            data: data.map((item) => item.value),
            universalTransition: true,
          },
        };

        let currentOption = mapOption;
        chartInstance.current.setOption(mapOption);

        // Auto-switch between map and bar every 2 seconds
        const interval = setInterval(() => {
          currentOption = currentOption === mapOption ? barOption : mapOption;
          chartInstance.current.setOption(currentOption, true);
        }, 2000);

        // Cleanup interval on effect re-run
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error loading chart data:', error);
        chartInstance.current.hideLoading();
      }
    };

    loadData();

    // Cleanup chart instance on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
      }
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default USAMapChart;