import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

const WorldMap = () => {
  const data = [
    {
      type: 'scattergeo',
      mode: 'markers',
      lon: [24.34],
      lat: [17.6],
      marker: {
        width: 4,
        color: 'rgb(255,0,0)',
      },
      text: 'hello',
    },
  ];

  const layout = {
    autoresize: false,
    width: 480,
    height: 290,
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
      projection_scale: 1.6,
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
      scale: 2,
    },
    fillFrame: true,
    frameMargins: 0,
    watermark: false,
    locale: 'en',
  };

  return (
    <div className={'w-full 2xl:min-w-[400px] h-[200px] 2xl:min-h-[260px]'}>
      <Plot data={data} layout={layout} config={config} />
    </div>
  );
};

export default WorldMap;
