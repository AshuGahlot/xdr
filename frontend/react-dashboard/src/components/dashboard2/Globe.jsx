import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import useThemeMode from "../../Hooks/useThemeMode";
import { useLocation } from "react-router-dom";

const MapComponent = () => {
  const [rotation, setRotation] = useState(0); // State for rotation
  const animationFrameId = useRef(null); // To store the ID of the animation frame
  const isAnimating = useRef(true); // Track whether animation should be running
  const isDarkTheme = useThemeMode === "dark";

  const location = useLocation();
  const { data, type } = location.state || {}; // Accessing passed data
  console.log(data);

  const mapData = [
    {
      type: "scattergeo",
      mode: "lines",
      lon: [],
      lat: [],
      line: {
        width: 2,
      },
    },
  ];

  const layout = {
    width: 1000,
    height: 1000,
    geo: {
      projection: {
        type: "orthographic",
        rotation: {
          lon: rotation, // Longitude for rotation
          lat: 0,
          roll: 0,
        },
        scale: 0.7,
      },
      scope: "world",
      showcoastlines: true,
      coastlinecolor: isDarkTheme ? "rgb(24, 184, 178)" : "rgb(0, 136, 129)",
      showland: true,
      landcolor: "rgb(0.1, 0.2, 0.2)",
      showocean: true,
      oceancolor: isDarkTheme ? "rgb(173, 216, 230)" : "rgb(0.07, 0.1, 0.1)",
      coastlinewidth: 0.4,
      showcountries: true,
      countrycolor: "rgb(4, 184, 178)",
      countrywidth: 0.4,
      bgcolor: "rgba(0, 0, 0, 0)",
      fixedrange: true,
      scrollzoom: false,
    },
    margin: { t: 0, b: 0, l: 0, r: 0 },
    paper_bgcolor: "rgb(74, 74, 74,0)",
    plot_bgcolor: "rgba(10, 0, 0,1)",
    showlegend: false,
    dragmode: true,
  };

  // Function to start the rotation animation
  const startRotation = () => {
    isAnimating.current = true; // Ensure the animation state is set to active

    const animate = () => {
      if (isAnimating.current) {
        setRotation((prevRotation) => (prevRotation + 0.8) % 360); // Rotate by 0.8 degrees
        animationFrameId.current = requestAnimationFrame(animate);
      }
    };

    animationFrameId.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    startRotation(); // Start rotation on component mount

    return () => cancelAnimationFrame(animationFrameId.current); // Cleanup
  }, []);

  const handleMouseEnter = () => {
    isAnimating.current = false; // Stop rotation
    cancelAnimationFrame(animationFrameId.current); // Clear the animation frame
  };

  const handleMouseLeave = () => {
    if (!isAnimating.current) {
      startRotation(); // Restart the animation on mouse leave
    }
  };

  const sizeFix = () => {
    const plotContainer = document.querySelector(".plot-container");
    if (plotContainer) {
      plotContainer.style.width = "100%";
      plotContainer.style.height = "100%";
    }
  };

  useEffect(() => {
    sizeFix(); // Set the size of the plot container when the component mounts
  }, []);

  return (
    <div className="w-auto flex h-[1000px] bg-[#000000]">
      <div className="md:h-[400px] 2xl:h-[500px] ml-10 text-xs text-white bg-gray-900 mt-40  py-4 w-[450px] overflow-y-scroll">
        <table>
          <thead className="bg-gray-700 text-center">
            <tr>
              <th className="px-2 py-2">Local Address</th>
              <th className="px-2 py-2">Process Name</th>
              <th className="px-2 py-2">Remote Address</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr className='tableRow'>
                  <td className="px-2 py-3">{item.local_addr}</td>
                  <td className="px-2 py-3">{item.process_name}</td>
                  <td className="px-2 py-3">{item.rem_addr}</td>
                </tr>
              ))
            ) : (
              <p>No Data Found for Connected IP</p>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="w-full h-full sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Plot
          data={mapData}
          layout={layout}
          config={{ displayModeBar: false }}
        />
      </div>
    </div>
  );
};

export default MapComponent;
