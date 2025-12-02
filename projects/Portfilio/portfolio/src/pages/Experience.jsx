import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;

    gsap.fromTo(
      line,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          end: "bottom 80%",
          scrub: true,
        },
      }
    );
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 80 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.8, ease: "easeOut" },
    }),
  };

  const experienceData = [
    {
      title: "Full-Stack Developer Intern",
      company: "WsCube Tech",
      time: "Dec 2024 – Sep 2025 · 9 Months",
      points: [
        "Developed responsive UIs using React.js, Next.js, HTML5, CSS3 & JavaScript.",
        "Converted Figma/Adobe designs into pixel-perfect components with Tailwind CSS.",
        "Built and integrated REST APIs using Node.js + Express.js.",
        "Worked with MongoDB + Mongoose for schema design & data modeling.",
        "Improved UI consistency and performance with reusable components.",
      ],
    },
  ];

  return (
    
    <section  id="experience" ref={sectionRef} className="w-full min-h-screen py-20 bg-black text-white relative overflow-hidden">
      <h2 className="text-5xl font-bold uppercase mb-16 ml-10 text-center relative inline-block mx-auto">
        Experience
        <span className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-40 h-1 bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]"></span>
      </h2>

      {/* Vertical Animated Line */}
      <div className="absolute left-8 top-0 h-full w-[3px] bg-white/10 overflow-hidden">
        <div
          ref={lineRef}
          className="w-full bg-linear-to-b from-[#00bf8f] via-[#1cd8d2] to-[#302b63]"
        ></div>
      </div>

      <div className="ml-16 space-y-20">
        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.4 }}
            className="relative"
          >
            {/* Dot */}
            <span className="absolute -left-12 top-2 w-6 h-6 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] shadow-lg"></span>

            {/* Card */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-xl max-w-3xl hover:scale-[1.03] transition-all duration-300">
              <h3 className="text-2xl font-semibold">
                {exp.title} —
                <span className="bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] bg-clip-text text-transparent ml-1">
                  {exp.company}
                </span>
              </h3>

              <p className="text-gray-400 text-sm mb-4">{exp.time}</p>

              <ul className="space-y-2 text-gray-300 text-[15px] leading-relaxed">
                {exp.points.map((p, idx) => (
                  <li key={idx}>• {p}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
