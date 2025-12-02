import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import age from '../assets/age.png'
import eSite from '../assets/esite.png'
import nike from '../assets/nike.png'
import weather from '../assets/weather.png'
import ProjectCard from '../components/ProjectCard'
import monstaHome from '../assets/monstaHome.png'
import adminPanel from '../assets/Admin.png'




const Projects = () => {
  const projects = [
    {
      image1: monstaHome,
      name: 'Monsta Furniture – Full Stack',
      // link: '/monsta',
      image2: adminPanel,
      name2: 'Admin Panel Monsta',
      // link2: '#',
      // image3: monsta3,
    },
    {
      image1: eSite,
      name: 'E-Commerce Site ',
      link: 'https://aniljangid1111.github.io/e-commerceWeb/',
      image2: nike,
      name2: 'Nike Clone',
      link2: 'https://aniljangid1111.github.io/NikeClone/'
    },
    {
      image1: weather,
      name: 'weather App',
      link: 'https://weather-app-xi-navy-64.vercel.app/',
      image2: age,
      name2: 'Age Calculator',
      link2: 'https://aniljangid1111.github.io/Age_calculator/',

    },


  ]

  gsap.registerPlugin(ScrollTrigger)
  useGSAP(() => {
    gsap.from(".hero", {
      height: "100px",
      stagger: {
        amount: 0.4
      },
      scrollTrigger: {
        trigger: ".lol",
        markers: false,
        start: "top 100%",
        end: "top -100%",
        scrub: true,
      },
    });
  });


  return (
    <section id="projects" className='w-full bg-black relative'>
      <div className='p-2 lg:p-4 '>
        <div className='pt-[35vh] md:pt-[45vh] '>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5 }}
            className='lg:text-[9.5vw] text-6xl relative uppercase'>Projects
          </motion.h1>
          <div className='absolute w-full -left-20 top-90 md:top-90 lg:top-100 h-10 lg:h-20  bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-100
         blur-[45px]
         ' />
        </div>

        <div className='lol -lg:mt-10'>
          {
            projects.map((v, i) => {
              return <div key={i} className='hero w-full lg:h-[500px]  mb-4 flex flex-col lg:flex-row lg:gap-4 gap-2'>
                <ProjectCard link={v.link} link2={v.link2} image1={v.image1} name={v.name} image2={v.image2} name2={v.name2} />
              </div>
            })
          }

        </div>

      </div>
    </section>
  )
}

export default Projects