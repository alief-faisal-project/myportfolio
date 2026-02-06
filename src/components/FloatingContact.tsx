import { useEffect, useState } from "react";

const contacts = [
  {
    icon: "fa-regular fa-handshake",
    label: "Resume",
    href: "#",
  },
  {
    icon: "fa-regular fa-envelope",
    label: "Email",
    href: "mailto:alieffaisal222@gmail.com",
  },
  {
    icon: "fa-brands fa-whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/6283120996468",
  },
];

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#home");
    const footer = document.querySelector("footer");

    if (!footer) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // MOBILE: hide di hero
          if (
            isMobile &&
            hero &&
            entry.target === hero &&
            entry.isIntersecting
          ) {
            setIsHidden(true);
            setIsOpen(false);
            return;
          }

          // DESKTOP + MOBILE: hide di footer
          if (entry.target === footer && entry.isIntersecting) {
            setIsHidden(true);
            setIsOpen(false);
            return;
          }

          setIsHidden(false);
        });
      },
      {
        threshold: 0.3,
      },
    );

    hero && isMobile && observer.observe(hero);
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-3 md:right-6 z-50
      transition-all duration-500 ease-in-out
      ${
        isHidden
          ? "opacity-0 translate-y-6 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      {/* Dropdown */}
      <div
        className={`absolute bottom-full right-0 mb-6
        bg-background border border-border
        rounded-xl shadow-2xl
        p-4 min-w-64 max-h-72 overflow-y-auto
        transition-all duration-300
        ${
          isOpen
            ? "opacity-100 visible translate-y-0 pointer-events-auto"
            : "opacity-0 invisible translate-y-3 pointer-events-none"
        }`}
      >
        <div className="space-y-2">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-0
              hover:bg-muted transition-colors group"
            >
              <i className={`${contact.icon} text-lg w-5 text-primary`} />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {contact.label}
                </p>
                <p className="text-sm group-hover:underline">{contact.value}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="floating-pill flex items-center gap-2 relative overflow-hidden"
        aria-label="Toggle contact menu"
      >
        <span className="relative w-5 h-5 flex items-center justify-center">
          <i
            className={`fa-solid fa-envelope absolute transition-all duration-300 ${
              isOpen ? "opacity-0 scale-0 rotate-90" : "opacity-100"
            }`}
          />
          <i
            className={`fa-solid fa-x absolute transition-all duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 scale-0 -rotate-90"
            }`}
          />
        </span>
        <span className="uppercase tracking-wider text-sm font-semibold">
          Contact Me
        </span>
      </button>
    </div>
  );
};

export default FloatingContact;
