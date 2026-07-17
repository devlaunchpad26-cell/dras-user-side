import Slider from "react-slick";
import ProjectCard from "./ProjectCard";
import { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

gsap.registerPlugin(ScrollTrigger);

// 🔁 Previous Arrow
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 rounded bg-white px-3 py-2 text-black shadow transition hover:scale-110"
  >
    ‹
  </button>
);

// 🔁 Next Arrow
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 rounded bg-white px-3 py-2 text-black shadow transition hover:scale-110"
  >
    ›
  </button>
);

export default function ProjectsSlider({ data }) {
  const sectionRef = useRef(null);

  const projects = data?.items || [];
  const title = data?.title || "SOME OF OUR PROMINENT PROJECTS";

  const settings = {
    dots: true,
    infinite: projects.length > 1,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: projects.length > 1,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  useLayoutEffect(() => {
    if (!projects.length) return;

    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".project-client", {
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".project-card", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (!projects.length) {
    return (
      <section className="bg-[#264f96] py-20 text-center text-white">
        No Projects Available
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#264f96] py-20">
      <div className="relative mx-auto w-[90vw] max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="projects-heading text-3xl font-bold text-white md:text-4xl">
            {title}
          </h2>

          <div className="mx-auto mt-4 h-[3px] w-40 bg-white"></div>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {projects.map((project, index) => (
            <div key={project.id || index}>
              <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:justify-around">
                {/* Client */}
                <div className="project-client flex pl-6 justify-center md:w-1/3">
                  <h3 className="text-center text-2xl font-semibold leading-snug text-white md:text-left md:text-3xl">
                    {project.client}
                  </h3>
                </div>

                {/* Cards */}
                <div className="flex justify-center md:w-2/3">
                  <div
                    className={`grid gap-6 ${
                      project.cards.length === 1
                        ? "grid-cols-1 max-w-xs"
                        : project.cards.length === 2
                        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
                        : project.cards.length === 3
                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl"
                        : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {project.cards.map((card, i) => (
                      <div key={card.id || i} className="project-card">
                        <ProjectCard
                          image={card.image}
                          title={card.title}
                          projectId={project.id}
                          cardId={card.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}