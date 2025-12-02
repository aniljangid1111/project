import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaReact, FaNodeJs, FaBootstrap, FaGitAlt } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress, SiJavascript, SiNextdotjs, SiPostman, SiVercel } from "react-icons/si";

const skills = [
  { name: "React.js", icon: <FaReact className="text-[#61dafb]" />, type: "Front-End" },
  { name: "Next.js", icon: <SiNextdotjs className="text-white" />, type: "Front-End" },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, type: "Front-End" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38bdf8]" />, type: "Front-End" },
  { name: "Bootstrap", icon: <FaBootstrap className="text-[#7952b3]" />, type: "Front-End" },
  { name: "Node.js", icon: <FaNodeJs className="text-[#3c873a]" />, type: "Back-End" },
  { name: "Express.js", icon: <SiExpress className="text-gray-300" />, type: "Back-End" },
  { name: "MongoDB", icon: <SiMongodb className="text-[#4DB33D]" />, type: "Back-End" },
  { name: "REST APIs", icon: <SiPostman className="text-[#FF6C37]" />, type: "Back-End" },
  { name: "Git & GitHub", icon: <FaGitAlt className="text-[#f1502f]" />, type: "Tools" },
  { name: "Vercel & Netlify", icon: <SiVercel className="text-white" />, type: "Deployment" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-300px" });

  return (
    <section
      id="skills"
      ref={ref}
      className="w-full min-h-screen bg-black relative overflow-hidden flex flex-col items-center py-20 px-6 md:px-16"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ duration: 1.5 }}

        className="absolute  inset-x-0 bottom-0  h-20
   bg-linear-to-b from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
  opacity-30 blur-[80px]"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
        transition={{ duration: 1.5 }}

        className="absolute  inset-x-0 top-0  h-20
   bg-linear-to-b from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
  opacity-30 blur-[80px]"
      ></motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl uppercase font-bold text-white border-b-4 border-[#00bf8f] inline-block pb-2">
          My Skills
        </h2>
        <p className="text-gray-300 mt-4 max-w-xl mx-auto">
          I create modern, responsive, and scalable web applications using these technologies and tools.
        </p>
      </motion.div>

      {/* Skill Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid z-100  grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 w-full"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{
              scale: 1.1,
              y: -5,
              rotate: 1,
              boxShadow: "0 10px 25px rgba(0,255,255,0.3)",
            }}
            whileTap={{ scale: 0.95, rotate: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl p-5 flex flex-col items-center justify-center cursor-pointer bg-linear-to-br  from-[#061D1C] via-black to-[#0A2B29]  bg-opacity-20 backdrop-blur-2xl  hover:bg-opacity-40 "
          >
            <div className="text-5xl mb-3">{skill.icon}</div>
            <p className="font-semibold text-white">{skill.name}</p>
            <span className="text-gray-400 text-sm">{skill.type}</span>

            {/* Neon Glow Effect */}
            <div className="absolute inset-0 rounded-xl border border-cyan-400 opacity-0 hover:opacity-50 transition-opacity duration-300 blur-xl"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
