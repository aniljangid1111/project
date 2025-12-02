import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';
import { useRef, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


const Contact = () => {

  const formRef = useRef();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('')


  // HANDLE INPUT CHANGES
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // FORM VALIDATION
  const validate = () => {
    let tempErrors = {};

    if (!formData.user_name.trim()) {
      tempErrors.user_name = "Name is required";
    }

    if (!formData.user_email.trim()) {
      tempErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      tempErrors.user_email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0; // No errors
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('Sending')
    setLoading(true);
    try {
      emailjs.send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          ...formData,
          reply_to: formData.user_email
        },
        import.meta.env.VITE_PUBLIC_ID
      )
      setStatus("Success")
      setLoading(false);
      setFormData({ user_name: "", user_email: "", message: "" });

      setTimeout(() => setStatus(""), 3500);

    } catch (error) {
      console.error("EmailJS Error:", error);
      alert("Error sending message");
      setLoading(false);
      setStatus("error")

      setTimeout(() => setStatus(""), 3500);
    }
  };
  return (
    <section
      id="contact"
      className=" w-full h-screen bg-black text-white relative overflow-hidden" // FIX: overflow hidden
    >
      {/* TOP BG SECTION */}
      <div className="w-full flex flex-col h-[50%] md:justify-end relative bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]">
        <div className="flex  relative mb-3 md:items-end">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-5xl font-mono pt-1 md:pt-5 font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-white via-[#aca8de] to-[#302b63] md:text-start w-full"
          >
            Contact Me
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden md:block ms-3 mb-5 w-40 h-1 bg-linear-to-r from-[#00bf8f] via-[#1cd8d2] to-[#302b63]"></motion.span>
          </motion.h3>

        </div>
      </div>

      {/* DESKTOP EMAIL + PHONE CARDS */}
      <div className=" absolute left-15 md:left-5 bottom-5">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="md:flex  gap-5">
          {/* EMAIL */}
          <a href="mailto:aniljangid6199@gmail.com">
            <div className="relative mb-5 md:mb-0 rounded-xl px-5 py-3 md:px-7 md:py-4 flex gap-5 items-center cursor-pointer bg-linear-to-br from-[#061D1C] via-black to-[#0A2B29] bg-opacity-20 backdrop-blur-2xl hover:bg-opacity-40">
              <div className="text-2xl"><MdOutlineEmail /></div>
              <div className="flex flex-col gap-2">
                <p>Email</p>
                <span className="w-40 h-1 bg-linear-to-r from-[#00bf8f] via-[#1cd8d2] to-[#302b63]"></span>
                <p className="font-semibold text-sm md:text-md">aniljangid6199@gmail.com</p>
              </div>
            </div>
          </a>


          {/* PHONE */}
          <a href="tel:+918441937079">
            <div className="relative mb-5 md:mb-0 rounded-xl px-5 py-3 md:px-7 md:py-4 flex gap-5 items-center cursor-pointer bg-linear-to-br from-[#061D1C] via-black to-[#0A2B29] bg-opacity-20 backdrop-blur-2xl hover:bg-opacity-40">
              <div className="text-2xl"><FaPhoneAlt /></div>
              <div className="flex flex-col gap-2 md:gap-1">
                <p>Phone</p>
                <span className="w-40 h-1 bg-linear-to-r from-[#00bf8f] via-[#1cd8d2] to-[#302b63]"></span>
                <p className="font-semibold text-sm md:text-md">+91 8441937079</p>
              </div>
            </div>
          </a>

        </motion.div>
      </div>

      {/* FORM SECTION — FIXED POSITIONING */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute px-5 md:top-1/2 top-100 -translate-y-1/2 md:right-32 md:w-[500px] w-[90%] left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0"
      >
        <form
          ref={formRef}
          onSubmit={sendEmail}
          className="flex flex-col w-full py-10 gap-4 bg-black/70 backdrop-blur-xl border border-white/20 p-8 rounded-xl shadow-xl"
        >
          <h1 className="font-bold text-xl">Send Us a Message</h1>

          {/* NAME */}
          <div>
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
              className="w-full mb-4 bg-black/50 border border-white/30 rounded-md p-4 text-white placeholder-gray-400 focus:border-[#00bf8f] focus:ring-1 focus:ring-[#00bf8f]"
            />
            {errors.user_name && (
              <p className="text-red-400 text-sm mt-2">{errors.user_name}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleChange}
              className="w-full mb-4 bg-black/50 border border-white/30 rounded-md p-4 text-white placeholder-gray-400 focus:border-[#00bf8f] focus:ring-1 focus:ring-[#00bf8f]"
            />
            {errors.user_email && (
              <p className="text-red-400 text-sm mt-2">{errors.user_email}</p>
            )}
          </div>

          {/* MESSAGE */}
          <div>
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-black/50 border border-white/30 rounded-md p-4 text-white placeholder-gray-400 focus:border-[#00bf8f] focus:ring-1 focus:ring-[#00bf8f] resize-none"
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-sm mt-2">{errors.message}</p>
            )}
          </div>
          {status && (
            <span className={`text-sm inline-block ${status === 'Success' ? "text-green-400" : status === 'error' ? 'text-red-400' : 'text-yellow-300'}  `}>
              {status === 'Sending' ? 'Sending...' : status === 'Success' ? 'Message Send Successfully' : 'Somthing Went Wrong'}
            </span>
          )

          }

          <button
            type="submit"
            disabled={loading} // ✅ disable while sending
            className={`bg-linear-to-r from-[#00bf8f] via-[#1cd8d2] to-[#302b63] py-3 px-6 rounded-lg font-semibold text-white hover:scale-105 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>
      </motion.div>
    </section >
  );
};

export default Contact;
