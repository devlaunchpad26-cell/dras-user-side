import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, getImageUrl } from "../utils/api";
import PageHero from "../components/PageHero";

export default function ProjectOverview() {
  const { projectId, cardId } = useParams();

  const [project, setProject] = useState(null);
  const [card, setCard] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="flex items-center justify-center min-h-[50vh] text-lg">
        Loading Project...
      </div>
    );
  }

  const images = card?.overview?.media?.images || [];
  const videos = card?.overview?.media?.videos || [];

  return (
    <>
      <div className="bg-white">
        {/* HERO */}
        <PageHero
          title="Project Overview"
          backgroundImage={getImageUrl(card.image)}
        />

        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* PROJECT NAME */}
          <div className="border-b py-4">
            <span className="font-semibold">Client Name :</span>{" "}
            {project.client}
          </div>

          {/* CLIENT NAME */}
          <div className="border-b py-4">
            <span className="font-semibold">Project Name :</span>{" "}
            {card.title}
          </div>

          {/* CLIENT REQUIREMENT */}
          <div className="border-b py-6">
            <h3 className="text-lg font-semibold mb-2">
              1. Client Requirement
            </h3>

            <p className="text-black text-base whitespace-pre-line">
              {card?.overview?.requirement || "No data available"}
            </p>
          </div>

          {/* SITE PHOTOS */}
          <div className="border-b py-6">
            <h3 className="text-lg font-semibold mb-4">
              2. Site Photos
            </h3>

            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={getImageUrl(img)}
                    alt={`Site ${index + 1}`}
                    className="w-full h-56 object-cover rounded-lg shadow cursor-pointer transition-transform duration-300 hover:scale-105"
                    onClick={() => setSelectedImage(getImageUrl(img))}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/dras-logo.jpeg";
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
              <div className="space-y-6">
                {videos.map((video, index) => (
                  <div key={index} className="w-full">
                    <iframe
                      src={video}
                      title={`Video ${index + 1}`}
                      className="w-full h-64 md:h-[450px] rounded-lg shadow"
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

            <p className="text-black text-base whitespace-pre-line">
              {card?.overview?.completion || "No data available"}
            </p>
          </div>
        </div>
      </div>

      {/* FULLSCREEN IMAGE PREVIEW */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-5 right-6 text-white text-5xl font-light hover:text-gray-300 transition"
            onClick={() => setSelectedImage(null)}
          >
            &times;
          </button>

          {/* Image */}
          <img
            src={selectedImage}
            alt="Preview"
            className="max-w-[95vw] max-h-[95vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/dras-logo.jpeg";
            }}
          />
        </div>
      )}
    </>
  );
}