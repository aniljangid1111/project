import React from 'react'

const ProjectCard = (props) => {
    return (
        <>
            {/* Card 1 */}
            <a
                href={props.link}
                target="_blank"
                rel="noopener noreferrer"
                className='lg:w-1/2 group transition-all relative rounded-none hover:rounded-[50px] overflow-hidden h-full block'
            >
                <img
                    className='h-full w-full object-cover'
                    src={props.image1}
                    alt={props.name}
                />

                <div className='  opacity-0 transition-opacity group-hover:opacity-100 flex justify-center items-center h-full w-full 
                bg-black/50 absolute top-0 left-0'>

                    <h2 className='uppercase text-sm md:text-4xl border-2 p-2 z-10 text-white border-white rounded-full'>
                        {props.name}
                    </h2>
                </div>

            </a>
            <h2 className='block lg:hidden uppercase text-sm md:text-4xl  p-2 z-10  font-extralight text-transparent bg-clip-text bg-linear-to-r from-[#145d5b]
          via-[#00bf8f] to-[#302b63] drop-shadow-lg  '>
                {props.name}
            </h2>

            {/* Card 2 */}
            <a
                href={props.link2}
                target="_blank"
                rel="noopener noreferrer"
                className='lg:w-1/2 group transition-all relative rounded-none hover:rounded-[50px] overflow-hidden h-full block'
            >
                <img
                    className='h-full w-full object-cover'
                    src={props.image2}
                    alt={props.name2}
                />

                <div className=' opacity-0 transition-opacity group-hover:opacity-100 flex justify-center items-center h-full w-full 
                bg-black/50 absolute top-0 left-0'>

                    <h2 className='uppercase text-sm md:text-4xl border-2 p-2 z-10 text-white border-white rounded-full'>
                        {props.name2}
                    </h2>
                </div>
            </a>
            <h2 className='block lg:hidden uppercase text-sm md:text-4xl  p-2 z-10  font-extralight text-transparent bg-clip-text bg-linear-to-r from-[#145d5b]
          via-[#00bf8f] to-[#302b63] drop-shadow-lg  '>
                {props.name2}
            </h2>
        </>
    )
}

export default ProjectCard
