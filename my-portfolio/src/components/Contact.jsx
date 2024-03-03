import React, { useRef, useState } from "react";
import { motion } from "framer-motion"; // Import motion from Framer Motion for animations
import emailjs from "@emailjs/browser"; // Import the emailjs library for sending emails

import { styles } from "../styles"; // Import styles
import { EarthCanvas } from "./canvas"; // Import EarthCanvas component
import { SectionWrapper } from "../hoc"; // Import SectionWrapper component
import { slideIn } from "../utils/motion"; // Import slideIn animation function

// Define Contact component
const Contact = () => {
  // Ref to access form DOM element
  const formRef = useRef();
  
  // State to manage form data and loading state
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Function to handle form input changes
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    // Update form state with new input value
    setForm({
      ...form,
      [name]: value,
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state to true while sending email

    // Send email using emailjs library
    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Robert Le",
          from_email: form.email,
          to_email: "robertle982@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false); // Set loading state to false after successful email sending
          alert("Thank you. I will get back to you as soon as possible."); // Show success message

          // Clear form inputs after successful submission
          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false); // Set loading state to false if email sending fails
          console.error(error); // Log error to console

          alert("Ahh, something went wrong. Please try again."); // Show error message
        }
      );
  };

  // Render Contact component
  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
      {/* Left side: Contact form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        {/* Contact form title */}
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* Contact form */}
        <form ref={formRef} onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          {/* Name input */}
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          
          {/* Email input */}
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          
          {/* Message textarea */}
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          {/* Submit button */}
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Right side: Earth canvas */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

// Export Contact component wrapped with SectionWrapper
export default SectionWrapper(Contact, "contact");
