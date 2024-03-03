import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Importing style and constant data
import { styles } from "../styles";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

// Navbar component definition
const Navbar = () => {
  // State variables using useState hook
  const [active, setActive] = useState(""); // To keep track of active navigation item
  const [toggle, setToggle] = useState(false); // To toggle the mobile menu
  const [scrolled, setScrolled] = useState(false); // To track if the page is scrolled

  // useEffect hook to handle scroll events
  useEffect(() => {
    // Function to handle scroll events
    const handleScroll = () => {
      // Get the current vertical scroll position
      const scrollTop = window.scrollY;
      // If the scroll position is greater than 100px, set scrolled to true
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        // Otherwise, set scrolled to false
        setScrolled(false);
      }
    };

    // Add event listener for scroll events when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener when component unmounts
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Dependency array is empty, so the effect runs only once after initial render

  // JSX rendering
  return (
    <nav
      // Dynamically set className based on scroll position for navbar background color
      className={`${
        styles.paddingX
      } w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        {/* Logo and site title */}
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            // Reset active state and scroll to top when clicking on logo
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          {/* Name of Navbar */}
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            Robert Le &nbsp;
            <span className='sm:block hidden'> | Software Engineer </span>
          </p>
        </Link>

        {/* Desktop navigation links */}
        <ul className='list-none hidden sm:flex flex-row gap-10'>
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? "text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile menu */}
          <div
            // Show/hide mobile menu based on toggle state
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}
          >
            {/* Render mobile navigation links */}
            <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    // Close mobile menu and set active navigation item when clicked
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
