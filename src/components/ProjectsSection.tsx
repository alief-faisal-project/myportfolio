import { useEffect, useRef, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

import bannerUrbnx from "@/assets/banner-urbnx.png";
import bannerBusalime from "@/assets/banner-busalime.jpg";
import bannerPetani from "@/assets/banner-petani.png";
import bannerFastcare from "@/assets/banner-fastcare.png";

const projects = [
  {
    title: "URBNX",
    description:
      "Modern fashion e-commerce website dengan desain minimalis dan katalog produk.",
    url: "https://urbnx.vercel.app/",
    banner: bannerUrbnx,
  },
  {
    title: "Busalime",
    description:
      "Website profil perusahaan dan showcase produk dengan interface yang intuitif dan mudah digunakan.",
    url: "https://busalime.vercel.app/",
    banner: bannerBusalime,
  },
  {
    title: "Pemetaan Petani",
    description:
      "Website pemetaan dan pengelolaan kelompok petani padi di Kabupaten Pandeglang.",
    url: "#",
    banner: bannerPetani,
  },
  {
    title: "FastCare - Cooming soon...",
    description: "Platform perncarian rumah sakit terdekat sesuai lokasi.",
    url: "#",
    banner: bannerFastcare,
  },
];

const ProjectsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="py-24 md:py-32 bg-secondary">
      <div className="container-custom">
        <h2 className="section-title">Projects</h2>

        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {projects.map((project, index) => {
              const isLink = project.url !== "#";

              const cardContent = (
                <>
                  <img
                    src={project.banner}
                    alt={project.title}
                    className="w-full aspect-[16/9] object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="pt-4">
                    <h3 className="text-xl font-bold uppercase tracking-wide">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </>
              );

              const slideClass =
                "min-w-0 shrink-0 grow-0 basis-full md:basis-1/2 pr-6";

              if (isLink) {
                return (
                  <a
                    key={index}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${slideClass}`}
                  >
                    {cardContent}
                  </a>
                );
              }

              return (
                <div key={index} className={slideClass}>
                  {cardContent}
                </div>
              );
            })}
          </div>
        </div>

        {scrollSnaps.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-6">
            {scrollSnaps.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-6 bg-foreground"
                    : "w-2 bg-foreground/25"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
