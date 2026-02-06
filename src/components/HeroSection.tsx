import MusicPlayer from './MusicPlayer';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-24">
      <div className="container-custom text-center">
        <p className="text-lg md:text-xl uppercase tracking-widest mb-4 text-muted-foreground">
          Hello, I'm
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight mb-6">
          Alief Faisal<br />Adriansyah
        </h1>
        <p className="text-2xl md:text-3xl uppercase tracking-wider text-muted-foreground">
          Frontend Developer
        </p>
        
        <div className="mt-12 flex justify-center gap-6">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-70 transition-opacity"
            aria-label="GitHub"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-70 transition-opacity"
            aria-label="LinkedIn"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a 
            href="https://instagram.com/faisaladrsyah" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl hover:opacity-70 transition-opacity"
            aria-label="Instagram"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <MusicPlayer />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
