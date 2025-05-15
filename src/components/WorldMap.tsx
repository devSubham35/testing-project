"use client";

import { useState } from "react";
import Image from "next/image";
import MapImage from "../images/Map.png";
import PinImage from "../images/Point.png";

const countries = [
  { name: "India", coordinates: [72, 40] },
  { name: "USA", coordinates: [18, 38] },
  { name: "Germany", coordinates: [58, 28] },
  { name: "France", coordinates: [56, 32] },
  { name: "Brazil", coordinates: [30, 72] },
  { name: "Australia", coordinates: [85, 85] },
  { name: "South Africa", coordinates: [60, 78] },
  { name: "Japan", coordinates: [82, 33] },
  { name: "Russia", coordinates: [68, 12] },
  { name: "Canada", coordinates: [22, 18] },
];

export default function ImageWorldMap() {
    
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center space-y-14 p-6">
      <h2 className="text-3xl font-bold text-gray-900">
        Dynamic <span className="text-red-500">Map</span>
      </h2>

      {/* Map Container */}
      <div className="relative w-full max-w-[800px]">
        {/* World Map Image */}
        <Image
          src={MapImage}
          alt="World Map"
          width={800}
          height={400}
          className="w-full h-auto"
        />

        {/* Country Pins */}
        {countries.map(({ name, coordinates }) => (
          <div
            key={name}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${coordinates[0]}%`,
              top: `${coordinates[1]}%`,
            }}
            onMouseEnter={() => setHoveredCountry(name)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            {/* Tooltip */}
            {hoveredCountry === name && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap 
              bg-black text-white text-xs rounded-md px-2 py-1 shadow-md">
                {name}
              </div>
            )}

            {/* Pin Image */}
            <Image
              src={PinImage}
              alt="Pin"
              width={100}
              height={100}
              className="size-6 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
