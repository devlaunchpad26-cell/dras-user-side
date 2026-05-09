import { Phone, MapPin } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getImageUrl } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ data,navbar }) {

  const footerRef = useRef(null);

  const footer = data || {};

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(".footer-item", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.25,
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 85%",
        }
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="text-gray-300 relative overflow-hidden bg-[#120038] bg-no-repeat bg-right bg-contain"
      style={{
        backgroundImage: footer.background
          ? `url(${getImageUrl(footer.background)})`
          : "none"
      }}
    >

      {/* 🔹 Top Line */}
      <div className="absolute top-4 left-0 w-full h-[1px] bg-gray-500/30"></div>

      {/* 🔹 MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

        {/* ✅ COLUMN 1 */}
        <div className="footer-item">
          <h2 className="text-2xl font-semibold text-gray-200 mb-6">
            {footer.companyName || "Company Name"}
          </h2>

          <p className="text-sm leading-relaxed text-gray-400">
            {footer.description || "Company description..."}
          </p>
        </div>

        {/* ✅ COLUMN 2 */}
        <div className="footer-item">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Call Us
          </h3>

          {footer.phones?.map((phone, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">
              <Phone size={18} />
              <span>{phone}</span>
            </div>
          ))}

          {/* Service */}
          {footer.servicePhone && (
            <>
              <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">
                Service
              </h3>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>{footer.servicePhone}</span>
              </div>
            </>
          )}
        </div>

        {/* ✅ COLUMN 3 */}
        <div className="footer-item">
          <h3 className="text-lg font-semibold text-gray-200 mb-6">
            Office
          </h3>

          <div className="flex gap-3">
            <MapPin size={20} className="mt-1" />
            <p className="text-sm text-gray-400 leading-relaxed">
              {footer.address || "Office address..."}
            </p>
          </div>
        </div>

       <div className="footer-item flex flex-col items-start">
  

  {navbar?.logo && (
    <img
      src={getImageUrl(navbar.logo)}
      alt="Logo"
      className="w-40 object-contain bg-white p-2 rounded"
      onError={(e) => {
        e.target.src = "https://via.placeholder.com/150x80?text=Logo";
      }}
    />
  )}
</div>

      </div>

  {/* 🔹 BOTTOM BAR */}
<div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400 footer-item px-4">

  <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">

    <span>
      © {new Date().getFullYear()}{" "}
      <span className="text-white font-medium">DRAS</span>
    </span>

    <span className="hidden md:block">|</span>

    <span>
      Developed By{" "}
      <a
        href="https://www.blueclan.tech/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 transition"
      >
        Blueclan Technologies
      </a>{" "}
      &{" "}
      <a
        href="https://devlaunchpad.co.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 transition"
      >
        DevLaunchPad LLP
      </a>
    </span>

    <span className="hidden md:block">|</span>

    <a
      href="https://honeydew-dolphin-604211.hostingersite.com"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-300 hover:text-white transition underline"
    >
      CMS
    </a>

  </div>

</div>

    </footer>
  );
}