import React, { useState } from "react";

function ValueCard({ icon, title, description }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="perspective cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-[260px] w-full transition-transform duration-700 transform-style preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >

        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#145a86] text-white rounded-xl backface-hidden shadow-lg">

          {icon}

          <h3 className="mt-4 text-lg font-semibold">
            {title}
          </h3>

        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white text-gray-700 rounded-xl backface-hidden rotate-y-180 shadow-lg px-6 text-center">

          <h3 className="text-xl font-semibold mb-3">
            {title}
          </h3>

          <p className="text-sm leading-relaxed">
            {description}
          </p>

        </div>

      </div>
    </div>
  );
}

export default ValueCard;