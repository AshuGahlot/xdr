import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";



const Accordian = () => {
  const [selectedData, setSelectedData] = useState(null); // State to store the selected row data

  const location = useLocation();
  const { data, type } = location.state || {}; // Accessing passed data

  // console.log(data)
  return (
    <>
      <div
        className={
          "relative overflow-x-auto overflow-scroll shadow-md sm:rounded-lg"
        }
      >
        <table
          className={
            "w-full text-sm text-left text-gray-500 dark:text-gray-400"
          }
        >
          <thead
            className={
              "text-xs sticky text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            }
          >
              {type === "firewallrules" && (
            <tr>
                  <th scope="col" className="px-2 py-3">
                    Firewall Rules
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Device Name
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Event ID
                  </th>
                  <th scope="col" className="px-2 py-3">
                    ID
                  </th>
            </tr>
              )}
          </thead>

          <tbody>
            <div
              className={
                "relative overflow-x-auto w-[1300px] overflow-scroll shadow-md sm:rounded-lg"
              }
            >
              <Accordion allowZeroExpanded className="">
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <AccordionItem key={index}>
                      <AccordionItemHeading>
                        <AccordionItemButton className="w-full h-20 flex border-b border-gray-400">
                          <td className="flex-1 px-2 py-3">
                            {item.lg_type}
                          </td>
                          <td className="flex-1 px-2 py-3">
                            {item.src_name}
                          </td>
                          <td className="flex-1 px-2 py-3">
                            {item.e_id}
                          </td>
                          <td className="flex-1 px-2 py-3">
                            {item.id}
                          </td>
                          <td className="flex-1 px-2 py-3">
                          ⇩ 
                          </td>
                        </AccordionItemButton>
                      </AccordionItemHeading>
                      <AccordionItemPanel className="px-4 py-2 bg-gray-500">
                        <p>
                          Details: Additional data for{" "}
                          <p>{item.lg_type || item.drv_name}</p>
                          <p>{item.src_name}</p>
                        </p>
                        {/* Add more details here */}
                      </AccordionItemPanel>
                    </AccordionItem>
                  ))
                ) : (
                  <p>No data found</p>
                )}
              </Accordion>
            </div>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Accordian;
