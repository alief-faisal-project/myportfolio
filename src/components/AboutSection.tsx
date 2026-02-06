const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-custom">
        <h2 className="section-title">About Me</h2>

        <div className="max-w-3xl text-justify">
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Saya sedang belajar dan menekuni dunia frontend development, dengan
            minat pada pembuatan tampilan web yang rapi, modern, dan nyaman
            digunakan. Saya menikmati proses mengubah desain menjadi antarmuka
            yang benar-benar bisa dipakai dan dirasakan manfaatnya oleh
            pengguna.
          </p>

          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Saat ini saya terbiasa menggunakan React, TypeScript, dan Tailwind
            CSS, serta beberapa teknologi frontend lainnya. Saya terus belajar,
            bereksperimen, dan mengikuti perkembangan teknologi. Tidak menutup
            kemungkinan ke depannya saya juga mempelajari backend agar dapat
            berkembang menjadi full-stack developer.
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            Bagi saya, frontend development adalah tempat di mana logika dan
            kreativitas saling bertemu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
