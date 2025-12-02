import React, { useState } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import Skills from './pages/Skills'
import Projects from './pages/Projects'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import Footer from './pages/Footer'
import Navbar from './components/Navbar'
import ParticlesBackground from './components/ParticlesBackground'
import CustomCursor from './components/CustomCursor'
import IntroSplash from './components/IntroAnimation'

const App = () => {

    const [showIntro, setShowIntro] = useState(true);

    if (showIntro) {
        return <IntroSplash onFinish={() => setShowIntro(false)} />;
    }

    return (
        <div className='relative gradient text-white'>
            <CustomCursor />
            {/* <ParticlesBackground /> */}
            <Navbar />
            <Home />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
            <Footer />
        </div>
    )
}

export default App
