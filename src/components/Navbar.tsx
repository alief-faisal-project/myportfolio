import { useState, useEffect, useRef } from 'react';

const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  {
    id: "projects",
    label: "Projects",
    dropdown: [
      { title: "URBNX", url: "https://urbnx.vercel.app/" },
      { title: "Busalime", url: "https://busalime.vercel.app/" },
      { title: "Pemetaan Petani", url: "https://pemetaanpoktan.vercel.app/" },
    ],
  },
  { id: "experience", label: "Learning" },
  { id: "education", label: "Education" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setMobileDropdown(null);
  };

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank');
    setOpenDropdown(null);
    setMobileDropdown(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-shadow duration-300 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container-custom">
        <div className="flex items-center justify-center py-6 md:py-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {'dropdown' in item && item.dropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.id)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </button>
                    
                    {/* Dropdown */}
                    <div 
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-background border border-border shadow-lg min-w-40 transition-all duration-200 ${
                        openDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      {item.dropdown.map((project) => (
                        <button
                          key={project.title}
                          onClick={() => handleProjectClick(project.url)}
                          className="block w-full text-left px-4 py-3 text-sm uppercase tracking-wider hover:bg-secondary transition-colors"
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden absolute right-6 flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`hamburger-line ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`hamburger-line ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 bg-background ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="container-custom pb-6 flex flex-col gap-4">
          {navItems.map((item) => (
            <div key={item.id}>
              {'dropdown' in item && item.dropdown ? (
                <>
                  <button
                    onClick={() => setMobileDropdown(mobileDropdown === item.id ? null : item.id)}
                    className={`nav-link text-left flex items-center justify-between w-full ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                    <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${mobileDropdown === item.id ? 'rotate-180' : ''}`}></i>
                  </button>
                  <div className={`overflow-hidden transition-all duration-200 ${mobileDropdown === item.id ? 'max-h-40 mt-2' : 'max-h-0'}`}>
                    <div className="pl-4 space-y-2">
                      {item.dropdown.map((project) => (
                        <button
                          key={project.title}
                          onClick={() => handleProjectClick(project.url)}
                          className="block text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`nav-link text-left ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
