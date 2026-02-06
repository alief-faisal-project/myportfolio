import { useEffect, useRef, useState } from 'react';

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

const ProjectsSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(projects.length).fill(false));
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex((ref) => ref === entry.target);
          if (index !== -1 && entry.isIntersecting) {
            setVisibleCards((prev) => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary">
      <div className="container-custom">
        <h2 className="section-title">Projects</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            const isVisible = visibleCards[index];
            
            return (
              <a
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                href={project.url}
                target={project.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`project-card group transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-x-0' 
                    : isLeft 
                      ? 'opacity-0 -translate-x-16' 
                      : 'opacity-0 translate-x-16'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-2xl font-bold uppercase tracking-wide group-hover:underline">
                    {project.title}
                  </h3>
                  {project.url !== '#' && (
                    <i className="fa-solid fa-arrow-up-right-from-square text-muted-foreground group-hover:text-foreground transition-colors"></i>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
