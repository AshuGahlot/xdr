import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Plot from "react-plotly.js";
import useThemeMode from "../../Hooks/useThemeMode";
import { useLocation } from "react-router-dom";

const MapComponent = () => {
  const [rotation, setRotation] = useState(0); // State for globe rotation
  const [currentIndex, setCurrentIndex] = useState(0); // Current index for the path
  const [longitude, setLongitude] = useState([]);
  const [latitude, setLatitude] = useState([]);
  const animationFrameId = useRef(null); // Animation frame ID
  const isAnimating = useRef(true); // Globe animation state
  const isDarkTheme = useThemeMode === "dark"; // Assuming `useThemeMode` exists
  const [sys, setSys] = useState([]);

  const location = useLocation();
  const { data, type, sys_info } = location.state || {}; // Accessing passed data

  // Parse and set latitude/longitude
  useEffect(() => {
    console.log(sys);
    console.log(sys_info);
    
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
    setSys(sys_info.location)
  }, [sys_info]);

  // Smooth Globe Rotation with Throttling
  const startRotation = useCallback(() => {
    isAnimating.current = true;
    let lastTimestamp = 0;
    let accumulatedRotation = 0;

    const rotateGlobe = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      const rotationSpeed = 0.01; // Normalized rotation speed
      accumulatedRotation = (accumulatedRotation - rotationSpeed * deltaTime) % 360;

      // Only update rotation every 16ms (about 60fps)
      if (Math.abs(accumulatedRotation - rotation) > 0.1) {
        setRotation((prevRotation) => (prevRotation - rotationSpeed * deltaTime + 360) % 360);
      }

      if (isAnimating.current) {
        animationFrameId.current = requestAnimationFrame(rotateGlobe);
      }
    };

    animationFrameId.current = requestAnimationFrame(rotateGlobe);
  }, [rotation]);

  useEffect(() => {
    startRotation(); // Start rotation on mount
    return () => cancelAnimationFrame(animationFrameId.current); // Cleanup
  }, [startRotation]);

  // Mouse events for pausing/resuming rotation
  const handleMouseEnter = useCallback(() => {
    isAnimating.current = false;
    cancelAnimationFrame(animationFrameId.current);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isAnimating.current) {
      isAnimating.current = true;
      startRotation();
    }
  }, [startRotation]);

  // Fix plot container size
  useEffect(() => {
    const sizeFix = () => {
      const plotContainer = document.querySelector(".plot-container");
      if (plotContainer) {
        plotContainer.style.width = "100%";
        plotContainer.style.height = "100%";
      }
    };
    sizeFix();
  }, []);

  // Memoized Map Data
  const mapData = useMemo(
    () => [
      // Connecting Lines
      {
        type: "scattergeo",
        mode: "lines",
        lon: longitude,
        lat: latitude,
        line: {
          width: 2,
          color: "rgb(24, 184, 178)", // Line color
          dash: "dashdot",
        },
      },
      // Markers on Each Point
      {
        type: "scattergeo",
        mode: "markers",
        lon: longitude, // All longitudes for markers
        lat: latitude, // All latitudes for markers
        marker: {
          size: 8, // Marker size
          color: "green", // Marker color
          symbol: "circle",
        },
      },
    ],
    [longitude, latitude]
  );

  // Responsive layout adjustments
  const layout = useMemo(() => {
    const isSmallScreen = window.innerWidth < 768;
    const globeSize = isSmallScreen ? 400 : 800; // Adjust size for smaller screens

    return {
      width: globeSize,
      height: globeSize * 0.78, // Maintain aspect ratio
      geo: {
        projection: {
          type: "orthographic",
          rotation: { lon: rotation, lat: 0, roll: 0 },
          scale: isSmallScreen ? 0.6 : 0.9,
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
        fixedrange: true,
        scrollzoom: false,
      },
      margin: { t: 0, b: 0, l: 0, r: 0 },
      paper_bgcolor: "rgb(74, 74, 74, 0)",
      plot_bgcolor: "rgba(10, 0, 0, 1)",
      showlegend: false,
      dragmode: true,
    };
  }, [rotation, isDarkTheme]);

  return (
    <div className="w-full h-[800px] grid grid-cols-4 pt-4" style={{background:' linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,43,65,1) 49%, rgba(0,4,5,1) 100%)'}}>
      <div className="md:h-[400px] 2xl:h-[600px] text-xs text-white bg-gray-900 sticky w-[450px] overflow-y-scroll z-10 border border-gray-700">
        <table>
          <thead className="bg-gray-700 text-center border-b-2  sticky top-0 z-10">
            <tr>
              <th className="px-8 py-2">Local Address</th>
              <th className="px-8 py-2">Process Name</th>
              <th className="px-8 py-2">Remote Address</th>
              {/* <th className="px-8 py-2">Country Flags</th> */}
            </tr>
          </thead>
          <tbody className="text-center text-gray-300">
            {data.length > 0 ? (
              data.map((item, index) => {
                 // Get a country emoji for each row (e.g., based on index or other logic)
    // const countryEmoji = sys[index % sys.length]?.loc?.country_emoji || "N/A"; 
                return (
                <tr key={index} className='tableRow'>
                  <td className="px-1 py-4">{item.local_addr}</td>
                  <td className="px-1 py-4">{item.process_name}</td>
                  <td className="px-1 py-4">{item.rem_addr}</td>
                  {/* <td className="px-1 py-4">{countryEmoji}</td> */}
                </tr>
                );
              })
            ) : (
              <tr>
                <td> </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div
        className="w-full h-full flex justify-start col-span-2 sm:w-[600px] sm:h-[600px] md:w-[800px] md:h-[800px] lg:w-[900px] lg:h-[800px] drop-shadow-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Plot
          data={mapData}
          layout={layout}
          config={{ displayModeBar: false }}
        />
      </div>
        
        <div className="md:h-[400px] 2xl:h-[500px] text-xs text-white bg-gray-900 sticky w-[380px] overflow-y-scroll border border-gray-700">
        <table>
          <thead className="bg-gray-700 text-center border-b-2 sticky top-0 z-10">
            <tr>
              <th className="px-2 py-2">Malicious IP Address</th>
              <th className="px-2 py-2">Domain</th>
              <th className="px-2 py-2">Country </th>
              <th className="px-2 py-2">Country flag</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {sys.length > 0 ? (
              sys.map((item, index) => (
                <tr key={index} className='tableRow'>
                  <td className="text-red-500 py-2 ">{item.ipabuse?.data?.ipAddress}</td>
                  <td className="text-red-600 py-2 ">{item.ipabuse?.data?.domain}</td>
                  <td className="text-red-500 py-2 ">{item.ipabuse?.data?.countryName}</td>
                  <td className=" py-2 ">{item.loc?.country_emoji}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td> </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default MapComponent;






// const MapComponent = () => {
//   const [rotation, setRotation] = useState(0); // State for globe rotation
//   const [currentIndex, setCurrentIndex] = useState(0); // Current index for the path
//   const [longitude, setLongitude] = useState([]);
//   const [latitude, setLatitude] = useState([]);
//   const animationFrameId = useRef(null); // Animation frame ID
//   const isAnimating = useRef(true); // Globe animation state
//   const isDarkTheme = useThemeMode === "dark"; // Assuming `useThemeMode` exists
//   const [sys, setSys] = useState([])

//   const location = useLocation();
//   const { data, type, sys_info } = location.state || {}; // Accessing passed data

//    // Parse and set latitude/longitude
//   useEffect(() => {
//     if (sys_info?.location) {
//       const newLongitude = [];
//       const newLatitude = [];
      
//       if (sys_info) {
//         setSys(sys_info.location); // Safely update state inside useEffect
//         console.log(sys);
//     }
    
      

//       sys_info.location.forEach(({ loc }) => {
//         newLatitude.push(parseFloat(loc.latitude));
//         newLongitude.push(parseFloat(loc.longitude));
//       });

//       setLatitude(newLatitude);
//       setLongitude(newLongitude);
//     }
//   }, [sys_info]);


//   // Smooth Globe Rotation
//   const startRotation = useCallback(() => {
//     isAnimating.current = true;
//     let lastTimestamp = 0;

//     const rotateGlobe = (timestamp) => {
//       if (!lastTimestamp) lastTimestamp = timestamp;
//       const deltaTime = timestamp - lastTimestamp;
//       lastTimestamp = timestamp;

//       const rotationSpeed = 0.02; // Slow and smooth rotation
//       setRotation((prevRotation) => (prevRotation - rotationSpeed * deltaTime + 360) % 360);

//       if (isAnimating.current) {
//         animationFrameId.current = requestAnimationFrame(rotateGlobe);
//       }
//     };

//     animationFrameId.current = requestAnimationFrame(rotateGlobe);
//   }, []);

//   useEffect(() => {
//     startRotation(); // Start rotation on mount
//     return () => cancelAnimationFrame(animationFrameId.current); // Cleanup
//   }, [startRotation]);


//   // Mouse events for pausing/resuming rotation
//   const handleMouseEnter = useCallback(() => {
//     isAnimating.current = false;
//     cancelAnimationFrame(animationFrameId.current);
//   }, []);

//   const handleMouseLeave = useCallback(() => {
//     if (!isAnimating.current) {
//       startRotation();
//     }
//   }, [startRotation]);

//   // Fix plot container size
//   useEffect(() => {
//     const sizeFix = () => {
//       const plotContainer = document.querySelector(".plot-container");
//       if (plotContainer) {
//         plotContainer.style.width = "100%";
//         plotContainer.style.height = "100%";
//       }
//     };
//     sizeFix();
//   }, []);

//   // Memoized Map Data
//   const mapData = useMemo(() => [
//     // Connecting Lines
//   {
//     type: "scattergeo",
//     mode: "lines",
//     lon: longitude,
//     lat: latitude,
//     line: {
//       width: 2,
//       color: "rgb(24, 184, 178)", // Line color
//       dash: 'dashdot',
//     },
//   },
//   // Markers on Each Point
//   {
//     type: "scattergeo",
//     mode: "markers",
//     lon: longitude, // All longitudes for markers
//     lat: latitude, // All latitudes for markers
//     marker: {
//       size: 8, // Marker size
//       color: "green", // Marker color
//       symbol: "circle",
//     },
//   },
// ], [longitude, latitude]);

//   const layout = useMemo(() => ({
//     width: 900,
//     height: 700,
//     geo: {
//       projection: {
//         type: "orthographic",
//         rotation: { lon: rotation, lat: 0, roll: 0 },
//         scale: 0.9,
//       },
//       scope: "world",
//       showcoastlines: true,
//       coastlinecolor: "rgb(0, 136, 129)",
//       showland: true,
//       landcolor: "rgb(0.1, 0.2, 0.2)",
//       showocean: true,
//       oceancolor: "rgb(0.07, 0.1, 0.1)",
//       coastlinewidth: 0.4,
//       showcountries: true,
//       countrycolor: "rgb(4, 184, 178)",
//       countrywidth: 0.4,
//       bgcolor: "rgba(0, 0, 0, 0)",
//       fixedrange: true,
//       scrollzoom: false,
//     },
//     margin: { t: 0, b: 0, l: 0, r: 0 },
//     paper_bgcolor: "rgb(74, 74, 74, 0)",
//     plot_bgcolor: "rgba(10, 0, 0, 1)",
//     showlegend: false,
//     dragmode: true,
//   }), [rotation, isDarkTheme]);