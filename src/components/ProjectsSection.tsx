import { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "URBNX",
    description:
      "Modern fashion e-commerce website dengan desain minimalis dan pengalaman shopping yang seamless.",
    url: "https://urbnx.vercel.app/",
  },
  {
    title: "Busalime",
    description:
      "Profil Perusahaan dan showcase produk untuk perusahaan cairan pencuci piring.",
    url: "https://busalime.vercel.app/",
  },
  {
    title: "Pemetaan Kelompok Petani Padi Pandeglang",
    description:
      "Platform pemetaan kelompok petani padi dikabupaten Pandeglang.",
    url: "https://pemetaanpoktan.vercel.app/",
  },
  {
    title: "FastCare - Coming Soon",
    description: "Website pencarian rumah sakit terdekat sesuai lokasi.",
    url: "#",
  },
];

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

const ProjectsSection = () => {
  const slides = chunkArray(projects, 2);

  // DESKTOP
  const [desktopVisible, setDesktopVisible] = useState(
    new Array(projects.length).fill(false),
  );
  const desktopRefs = useRef([]);

  // MOBILE
  const [mobileVisible, setMobileVisible] = useState(
    new Array(projects.length).fill(false),
  );
  const mobileRefs = useRef([]);

  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const desktopObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = desktopRefs.current.indexOf(entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setDesktopVisible((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    desktopRefs.current.forEach((ref) => {
      if (ref) desktopObserver.observe(ref);
    });

    return () => desktopObserver.disconnect();
  }, []);

  useEffect(() => {
    const mobileObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = mobileRefs.current.indexOf(entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setMobileVisible((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    mobileRefs.current.forEach((ref) => {
      if (ref) mobileObserver.observe(ref);
    });

    return () => mobileObserver.disconnect();
  }, []);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const width = carouselRef.current.offsetWidth;
    setActiveSlide(Math.round(carouselRef.current.scrollLeft / width));
  };

  const scrollToSlide = (index) => {
    carouselRef.current?.scrollTo({
      left: index * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary">
      <div className="container-custom">
        <h2 className="section-title">Projects</h2>

        {/* ===== DESKTOP ===== */}
        <div className="hidden md:grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = desktopVisible[index];

            return (
              <a
                key={index}
                ref={(el) => (desktopRefs.current[index] = el)}
                href={project.url}
                target={project.url !== "#" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`project-card group transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : isLeft
                      ? "opacity-0 -translate-x-16"
                      : "opacity-0 translate-x-16"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold uppercase tracking-wide group-hover:underline">
                    {project.title}
                  </h3>
                  {project.url !== "#" && (
                    <i className="fa-solid fa-arrow-up-right-from-square text-muted-foreground group-hover:text-foreground transition-colors" />
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </a>
            );
          })}
        </div>

        {/* ===== MOBILE CAROUSEL ===== */}
        <div className="md:hidden">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
          >
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                className="min-w-full snap-center flex flex-col gap-4 px-1"
              >
                {slide.map((project, i) => {
                  const realIndex = slideIndex * 2 + i;
                  const isVisible = mobileVisible[realIndex];

                  return (
                    <a
                      key={realIndex}
                      ref={(el) => (mobileRefs.current[realIndex] = el)}
                      href={project.url}
                      target={project.url !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`project-card group transition-all duration-700 ease-out ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-8"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold uppercase tracking-wide group-hover:underline">
                          {project.title}
                        </h3>
                        {project.url !== "#" && (
                          <i className="fa-solid fa-arrow-up-right-from-square text-muted-foreground group-hover:text-foreground transition-colors" />
                        )}
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {project.description}
                      </p>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>

          {/* INDICATOR */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeSlide === index
                    ? "w-6 bg-foreground"
                    : "w-2 bg-muted-foreground"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
