const experiences = [
  {
    title: "React.js",
    icon: "fa-brands fa-react",
  },
  {
    title: "Tailwind CSS",
    icon: "fa-solid fa-wind",
  },
  {
    title: "MySQL",
    icon: "fa-solid fa-database",
  },
  {
    title: "Java Script",
    icon: "fa-brands fa-js",
  },
  {
    title: "Laravel",
    icon: "fa-brands fa-laravel",
  },
  {
    title: "PHP",
    icon: "fa-brands fa-php",
  },
  {
    title: "Amazon Web Services",
    icon: "fa-brands fa-amazon",
  },
  {
    title: "REST API",
    icon: "fa-solid fa-code-branch",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container-custom">
        <h2 className="section-title">Learning</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="flex flex-col items-center text-center p-8 border border-border hover:shadow-lg transition-all duration-300"
            >
              <i className={`${exp.icon} text-5xl mb-6`}></i>
              <h3 className="text-xl font-bold uppercase tracking-wide">
                {exp.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
