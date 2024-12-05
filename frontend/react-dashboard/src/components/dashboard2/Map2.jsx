import React, { useState, useEffect, useMemo } from 'react';
import Plot from 'react-plotly.js';
const WorldMap2 = ({sys_info}) => {
  const ports = sys_info?.ports || {};
  const [ipData, setIpData] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);

  // Memoized processing of ports and location data
  const ProceddesData = useMemo(() => {
    // Ensure valid ports data
    if (Array.isArray(ports)) {
      return ports;
      
    } else {
      console.log('Invalid Ports Data');
      return [];
    }
  }, [ports]);
  

  // Effect to update ipData when ProceddesData changes
  useEffect(() => {
    if (JSON.stringify(ipData) !== JSON.stringify(ProceddesData)) {
      setIpData(ProceddesData);

       // Process location data from sys_info if available
       if (sys_info?.location) {
        const newLongitude = [];
        const newLatitude = [];
        
        sys_info.location.forEach(({ loc }) => {
          newLatitude.push(parseFloat(loc.latitude));
          newLongitude.push(parseFloat(loc.longitude));
        });

        setLatitude(newLatitude);
        setLongitude(newLongitude);
      }
      // console.log(ProceddesData, ipData);
      
    }
  }, [ProceddesData, ipData]);

  // Prepare the data for Plotly map
  const data = useMemo(() => [
    {
      type: "scattergeo",
      mode: "markers+text", // Markers with text labels
      lon: longitude, // Longitude for markers
      lat: latitude,  // Latitude for markers
      marker: {
        size: 8, // Marker size
        color: "lightgreen", // Marker color
        symbol: "circle", // Marker symbol
      },
      // text: latitude.map((lat, index) => `Lat: ${lat}, Lon: ${longitude[index]}`), // Text for each marker
      textposition: "top right", // Position text relative to markers
      textfont: {
        family: "Arial",
        size: 10,
        color: "white", // Change text color based on theme if needed
      },
    },
  ], [longitude, latitude]);

  const layout = {
    autoresize: false,
    width: 450,
    height: 280,
    geo: {
      projection: {
        type: 'scattergeo',
        scale: 1,
      },
      scope: "world",
      showcoastlines: true,
      coastlinecolor: "rgb(0, 136, 129)",
      showland: true,
      landcolor: "rgb(0.1, 0.2, 0.2)",
      showocean: true,
      oceancolor: "rgb(0.07, 0.1, 0.1)",
      coastlinewidth: 0.4,
      showcountries: true,
      countrycolor: "rgb(4, 184, 178)",
      countrywidth: 0.4,
      bgcolor: "rgba(0, 0, 0, 0)",
      lonaxis: {
        range: [-180, 180],
        showgrid: false,
      },
      lataxis: {
        range: [-90, 90],
        showgrid: false,
      },
      scaleanchor: 'x',
      scaleratio: 1,
      projection_scale: 1.5,
    },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    paper_bgcolor: 'rgb(74, 74, 74, 0)',
    plot_bgcolor: 'rgba(10, 0, 0, 1)',
    showlegend: false,
    dragmode: true,
  };

  const config = {
    displayModeBar: false,
    modeBarButtonsToRemove: ['toImage'],
    displaylogo: false,
    responsive: true,
    scrollZoom: true,
    doubleClick: 'reset',
    editable: true,
    staticPlot: false,
    showTips: false,
    toImageButtonOptions: {
      format: 'png',
      filename: 'custom_image',
      height: 600,
      width: 800,
      scale: 3,
    },
    fillFrame: true,
    frameMargins: 0,
    watermark: false,
    locale: 'en',
  };

  return (
    <div className={'w-full h-[200px] 2xl:min-h-[260px] pt-3'}>
      <Plot data={data} layout={layout} config={config} />
    </div>
  );
};

export default WorldMap2;
