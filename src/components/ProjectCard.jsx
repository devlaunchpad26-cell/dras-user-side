import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../utils/api";
import { useMemo } from "react";
import React from "react";

function ProjectCard({ image, title, projectId, cardId }) {
  const navigate = useNavigate();

  const imageUrl = useMemo(() => getImageUrl(image), [image]);

  return (
    <div
      onClick={() => navigate(`/project/${projectId}/${cardId}`)}
      className="aspect-square bg-white max-h-[300px] overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer flex flex-col"
    >
    {/* IMAGE */}
<div className="flex-1 bg-gray-200 flex items-center justify-center overflow-hidden p-2">
  <img
    src={imageUrl}
    alt={title}
    className="max-w-full max-h-full object-contain"
    loading="lazy"
    onError={(e) => {
      e.currentTarget.onerror = null;
      e.currentTarget.src = "/dras-logo.jpeg";
    }}
  />
</div>

      {/* TITLE */}
      <div className="h-14 bg-gray-400 text-white text-sm flex items-center justify-center px-4 text-center font-medium">
        {title}
      </div>
    </div>
  );
}

export default React.memo(ProjectCard);