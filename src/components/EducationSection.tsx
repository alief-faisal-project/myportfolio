const educations = [
  {
    school: 'Universitas Serang Raya',
    major: 'Teknik Informatika',
    period: 'Ongoing',
    icon: 'fa-graduation-cap',
  },
  {
    school: 'SMA Negeri 4 Pandeglang',
    major: 'IPA',
    period: 'Completed',
    icon: 'fa-school',
  },
  {
    school: 'SMP Negeri 1 Menes',
    major: '',
    period: 'Completed',
    icon: 'fa-school-flag',
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 md:py-32">
      <div className="container-custom">
        <h2 className="section-title">Education</h2>
        
        <div className="space-y-8">
          {educations.map((edu, index) => (
            <div 
              key={index}
              className="flex items-start gap-6 p-6 border border-border hover:bg-secondary transition-colors duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-border">
                <i className={`fa-solid ${edu.icon} text-xl`}></i>
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide mb-1">
                  {edu.school}
                </h3>
                {edu.major && (
                  <p className="text-muted-foreground text-lg">
                    {edu.major}
                  </p>
                )}
              </div>
              <span className="text-sm uppercase tracking-wider text-muted-foreground">
                {edu.period}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
