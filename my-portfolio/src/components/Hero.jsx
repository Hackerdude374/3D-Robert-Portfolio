import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles"; // Importing styles
import { ComputersCanvas } from "./canvas"; // Importing the ComputersCanvas component

// Hero component definition
const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      {/* Container for hero content */}
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Left column containing decorative elements */}
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' /> {/* Small circular element */}
          <div className='w-1 sm:h-80 h-40 violet-gradient' /> {/* Vertical gradient element */}
        </div>

        {/* Right column containing main hero text */}
        <div>
          {/* Main heading */}
          <h1 className={`${styles.heroHeadText} text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl`}>
            Hi, I'm <span className='text-[#43e0d9]'>Robert Le</span>
          </h1>
          {/* Subheading */}
          <p className={`${styles.heroSubText} mt-2 text-white-100 text-sm md:text-base lg:text-lg xl:text-xl`}>
            I'm a skilled software developer currently pursuing a Bachelor of Science in Computer Science from the City University of New York, College of Staten Island. I specialize in 3D visuals, user interfaces, and web applications.
          </p>
        </div>
      </div>

      {/* Render ComputersCanvas component */}
      <ComputersCanvas />

      {/* Animated scroll indicator */}
      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'> {/* Link to scroll to the about section */}
          {/* Scroll indicator container */}
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            {/* Animated dot using Framer Motion */}
            <motion.div
              animate={{
                y: [0, 24, 0], // Animation values for y-axis
              }}
              transition={{
                duration: 1.5, // Animation duration
                repeat: Infinity, // Repeat animation infinitely
                repeatType: "loop", // Loop animation
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1' // Styling for the dot
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
