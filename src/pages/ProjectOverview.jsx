import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, getImageUrl } from "../utils/api";
import PageHero from "../components/PageHero";

export default function ProjectOverview() {
  const { projectId, cardId } = useParams();

  const [project, setProject] = useState(null);
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();

        const foundProject = res?.projects?.items?.find(
          (p) => String(p.id) === String(projectId)
        );

        const foundCard = foundProject?.cards?.find(
          (c) => String(c.id) === String(cardId)
        );

        setProject(foundProject);
        setCard(foundCard);
      } catch (err) {
        console.error("Error fetching project:", err);
      }
    };

    fetchData();
  }, [projectId, cardId]);

  if (!project || !card) {
    return (
      <div className="text-center py-20 text-lg">
        Loading Project...
      </div>
    );
  }

  const images = card?.overview?.media?.images || [];
  const videos = card?.overview?.media?.videos || [];

  return (
    <div className="bg-white">

      {/* HERO */}
      <PageHero
        title="Project Overview"
        backgroundImage={getImageUrl(card.image)}
      />

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* PROJECT NAME */}
        <div className="border-b py-4">
          <span className="font-semibold">Project Name :</span>{" "}
          {project.client}
        </div>

        {/* CLIENT NAME */}
        <div className="border-b py-4">
          <span className="font-semibold">Client Name :</span>{" "}
          {card.title}
        </div>

        {/* CLIENT REQUIREMENT */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-2">
            1. Client Requirement
          </h3>

          <p className="text-black text-base">
            {card?.overview?.requirement || "No data available"}
          </p>
        </div>

        {/* SITE PHOTOS */}
        <div className="border-b py-6">
          <h3 className="text-lg font-semibold mb-4">
            2. Site Photos
          </h3>

          {images.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={getImageUrl(img)}
                  alt={`Site ${index}`}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.src = "/dras-logo.jpeg";
                  }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm mb-4">
              No images available
            </p>
          )}

          {/* VIDEOS */}
          {videos.length > 0 && (
            <div className="space-y-4">
              {videos.map((video, index) => (
                <div key={index} className="w-full">
                  <iframe
                    src={video}
                    title={`Video ${index}`}
                    className="w-full h-64 rounded-lg"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FINAL COMPLETION */}
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-2">
            3. Final Completion
          </h3>

          <p className="text-black text-base">
            {card?.overview?.completion || "No data available"}
          </p>
        </div>

      </div>
    </div>
  );
}