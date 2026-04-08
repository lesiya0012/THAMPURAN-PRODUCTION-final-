import React, { useEffect, useRef, useState } from "react";

const Counter = ({ target, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          animate();
        }
      },
      { threshold: 0.6 }
    );

    if (ref.current) observer.observe(ref.current);

    const animate = () => {
      const duration = 2000;
      const startTime = performance.now();

      const update = (time) => {
        const progress = Math.min((time - startTime) / duration, 1);
        setCount(Math.floor(progress * target));

        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    };

    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const About = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-center py-24 md:py-32 px-6"
    >
  

      {/* Small title */}
      <p
        className={`text-yellow-500 tracking-[0.4em] text-xs md:text-sm mb-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        WHO WE ARE
      </p>

      {/* Main Title */}
      <h2
        className={`text-white text-3xl sm:text-4xl md:text-6xl font-serif mb-8 transition-all duration-1000 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        Crafting <span className="text-yellow-500">Cinematic</span> Excellence
      </h2>

      {/* Description */}
      <p
        className={`text-gray-400 max-w-3xl mx-auto text-base md:text-lg leading-relaxed mb-20 transition-all duration-1000 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        We are a full-service production house driven by a passion for
        storytelling and visual artistry. From blockbuster-quality films to
        cutting-edge brand content, we bring every project to life with
        uncompromising creativity, technical mastery, and an obsession with
        premium execution.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 max-w-5xl mx-auto">

        <div className="space-y-3">
          <h3 className="text-yellow-500 text-5xl md:text-6xl font-serif">
            <Counter target={150} />
          </h3>
          <div className="w-12 h-[1px] bg-yellow-500 mx-auto"></div>
          <p className="text-gray-400 tracking-widest text-xs md:text-sm">
            PROJECTS DELIVERED
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-yellow-500 text-5xl md:text-6xl font-serif">
            <Counter target={50} />
          </h3>
          <div className="w-12 h-[1px] bg-yellow-500 mx-auto"></div>
          <p className="text-gray-400 tracking-widest text-xs md:text-sm">
            HAPPY CLIENTS
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-yellow-500 text-5xl md:text-6xl font-serif">
            <Counter target={5} />
          </h3>
          <div className="w-12 h-[1px] bg-yellow-500 mx-auto"></div>
          <p className="text-gray-400 tracking-widest text-xs md:text-sm">
            YEARS EXPERIENCE
          </p>
        </div>

      </div>
    </section>
  );
};

export default About;