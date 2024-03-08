import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className={`${styles.serviceCard} p-[1px] rounded-[20px] shadow-card`}
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className={`${styles.serviceCardBody} py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col`}
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About Me</h2>
      </motion.div>

      <motion.ul
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] list-disc pl-6'
      >
        <li>
          <strong>Dedicated and Skilled Developer:</strong> Currently pursuing a Bachelor of Science in Computer Science from the City University of New York, College of Staten Island, with an expected graduation date of June 2025.
        </li>
        <li>
          <strong>Technical Proficiency:</strong> Solid foundation in various programming languages and technologies, including TypeScript, JavaScript, React, and Node.js.
        </li>
        <li>
          <strong>Full-Stack Development Experience:</strong> Tech Talent Pipeline Residency at the College of Staten Island, with practical experience in HTML5, CSS3, JavaScript, PostgreSQL, Node.js, React, and AWS.
        </li>
        <li>
          <strong>Project Collaboration:</strong> Actively participated in developing projects like Nature’s Call and ReacipeJS, collaborating with dynamic teams to architect, develop, and deploy innovative web applications.
        </li>
        <li>
          <strong>Industry Exposure:</strong> Gained valuable industry exposure through internships, contributing to the development and maintenance of full-stack websites using JavaScript, Bootstrap, PHP, and MySQL.
        </li>
        <li>
          <strong>Passionate Learner:</strong> Passionate about leveraging technology to solve problems and committed to continuous learning and growth in the field of software development.
        </li>
        <li>
          <strong>Collaboration:</strong> Excited about the opportunity to collaborate with you to bring your ideas to life.
        </li>
      </motion.ul>

      <div className='mt-20 flex flex-wrap gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
