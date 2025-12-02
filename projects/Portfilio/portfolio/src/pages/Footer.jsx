import React from 'react'
import { motion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaWhatsapp } from "react-icons/fa";


const Footer = () => {

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

  return (
    <div className='relative bg-black overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_70%_35%,rgba(13,88,202,0.35),transparent_70%)]' />
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_35%_70%,rgba(16,185,129,0.30),transparent_70%)]' />

      <motion.div className='relative z-10 sm:px-8 lg:px-10 py-16 md:py-20  flex flex-col items-center  text-center space-y-6'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className='font-semibold leading-none text-white select-none'
          style={{
            fontSize: 'clamp(3rem,5vw,14rem)',
            letterSpacing: '0.02em',
            lineHeight: 0.9,
            padding: '0 3vw',
            whiteSpace: 'nowrap',
            textShadow: '0 2px 18px rgba(0,0,0,0.45)',

          }}
        >
          Anil Suthar
        </h1>
        <div className='bg-linear-to-r from-[#00bf8f] via-[#1cd8d2] to-[#302b63] h-[3px] w-24 md:w-36 rounded-full ' />

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
        <p className='text-gray-500 italic max-w-xl'>
          "Inspired to build. Ready to grow"
        </p>

        <p className='text-xs text-gray-400'>
          &copy; {new Date().getFullYear()} Anil Suthar. All Rights reserved
        </p>


      </motion.div>

    </div>
  )
}

export default Footer