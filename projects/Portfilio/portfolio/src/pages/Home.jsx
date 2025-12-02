import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";
import ParticlesBackground from '../components/ParticlesBackground'

const Home = () => {

  const social = [
    { Icon: FaLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/anil-suthar-6b476b285' },
    { Icon: FaGithub, label: 'GitHub', href: 'https://github.com/aniljangid1111' },
    { Icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/918441937079' }

  ]

  const glowVarients = {
    initial: { opacity: 0, scale: 1, y: 15, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
    hover: {
      scale: 1.2, y: -3,
      filter: "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    },

    tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } }
  }

  const role = useMemo(() => ['Web Developer', 'MERN Stack Developer'], [])

  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = role[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex(v => v + 1)
      else if (!deleting && subIndex === current.length) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex(v => v - 1);
      else if (deleting && subIndex === 0) { setDeleting(false); setIndex(p => (p + 1) % role.length); }

    }, deleting ? 40 : 60);
    return () => clearTimeout(timeout)
  }, [subIndex, role, index, deleting])




  return (
    <section id="home" className='w-full h-screen relative bg-black overflow-hidden'>
      <ParticlesBackground />
      {/* blink circul */}
      <div className='absolute inset-0'>
        <div className='absolute -top-32 -left-32 w-[70vw] sm:w-[z-500vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-[500px] max-h-[500px]
        rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse
        '>

        </div>

        <div className='absolute -bottom-36 right-0 w-[70vw] sm:w-[500vw] md:w-[30vw] h-[70vw] sm:h-[50vw] md:h-[30vw] max-w-[500px] max-h-[500px]
        rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-30 sm:opacity-20 md:opacity-10
        blur-[100px] sm:blur-[130px] md:blur-[150px]
        animate-pulse delay-300'>

        </div>

      </div>

      <div className='relative  z-10 h-full w-full max-w-7xl mx-auto grid grid-cols-1 '>
        <div className='flex flex-col justify-center h-full text-center  relative'>
          {/* heading */}
          <div className='flex justify-center w-full  mx-auto text-center max-w-[48em]'>
            <motion.div className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white text-center  min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >

              <span className='text-center'>
                {role[index].substring(0, subIndex)}
              </span>
              <span className='inline-block w-[2px] ml-1 bg-white animate-pulse align-middle'
                style={{ height: '1em' }}
              >
              </span>

            </motion.div>

          </div>
          {/* name */}
          <motion.h1 className='text-4xl sm:text-5xl md:text-6xl  font-bold text-transparent bg-clip-text bg-linear-to-r from-[#1cd8d2]
          via-[#00bf8f] to-[#302b63] drop-shadow-lg'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >

            Hello, I'm
            <br />
            <span className='text-white font-bold text-5xl sm:text-6xl md:text-7xl  lg:whitespace-nowrap'>
              Anil Suthar
            </span>

          </motion.h1>

          <motion.p className='mt-6 text-center sm:text-lg md:text-xl text-gray-300 items-center max-w-3xl mx-auto '
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            I’m a MERN Stack Developer who builds smooth, responsive, and meaningful digital experiences — from elegant UIs to solid backend logic.
          </motion.p>

          <motion.div className='mt-10 flex flex-wrap items-center justify-center  gap-6'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <a href="#projects"
              className='px-5  md:px-6 py-3 rounded-full text-sm md:text-lg   text-white bg-linear-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] 
            shadow-lg hover:scale-105 transition-all '
            >
              View My Work

            </a>
            <a href="./resume.pdf"
              download
              className='px-5  md:px-6 py-3 rounded-full md:text-lg text-black bg-white hover:bg-gray-200  
            shadow-lg hover:scale-105 transition-all '
            >
              My Resume

            </a>
          </motion.div>

          <div className='ms-1 mt-10 flex gap-5 text-4xl md:text-4xl justify-center '>
            {
              social.map(({ Icon, label, href }) => (
                <motion.a href={href}
                  key={label}
                  label={label}
                  target='_blank'
                  aria-label={label}
                  rel='noopener noreferrer'
                  variants={glowVarients}
                  initial='initial'
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  whileHover='hover'
                  whileTap='tap'
                  className='text-gray-300'
                >
                  <Icon />

                </motion.a>
              ))
            }

          </div>

        </div>

      </div>
    </section >
  )
}

export default Home