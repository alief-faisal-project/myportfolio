import { useRef, useState } from "react";

const experiences = [
  { title: "React.js", icon: "fa-brands fa-react" },
  { title: "Tailwind CSS", icon: "fa-solid fa-wind" },
  { title: "MySQL", icon: "fa-solid fa-database" },
  { title: "Java Script", icon: "fa-brands fa-js" },
  { title: "Laravel", icon: "fa-brands fa-laravel" },
  { title: "PHP", icon: "fa-brands fa-php" },
  { title: "Amazon Web Services", icon: "fa-brands fa-amazon" },
  { title: "REST API", icon: "fa-solid fa-code-branch" },
];

// helper: potong array per 4 item
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, size + i));
  }
  return result;
};

const ExperienceSection = () => {
  const slides = chunkArray(experiences, 4);
  const containerRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.offsetWidth;
    const index = Math.round(scrollLeft / width);
    setActiveSlide(index);
  };

  const scrollToSlide = (index) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      left: index * containerRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-custom">
        <h2 className="section-title">Learning</h2>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col items-center text-center p-8 border border-border transition-all duration-300"
            >
              <i className={`${exp.icon} text-5xl mb-6`}></i>
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {exp.title}
              </h3>
            </div>
          ))}
        </div>

        {/* ===== MOBILE CAROUSEL ===== */}
        <div className="md:hidden">
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="min-w-full snap-center grid grid-cols-2 gap-4 px-1"
              >
                {slide.map((exp) => (
                  <div
                    key={exp.title}
                    className="flex flex-col items-center text-center p-6 border border-border"
                  >
                    <i className={`${exp.icon} text-4xl mb-4`}></i>
                    <h3 className="text-sm font-bold uppercase tracking-wide">
                      {exp.title}
                    </h3>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* ===== INDICATOR PIL ===== */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index ? "w-6 bg-black" : "w-2 bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
