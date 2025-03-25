import logo from "../../assets/images/logo.svg";
import {
  FaLinkedin,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  // FaPhoneAlt,
  FaClock,
} from "react-icons/fa"; // React Icons for Contact
// import { GrLinkNext } from "react-icons/gr";
// import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="bg-[#0F3B36] text-[#FFA377] py-10 px-6 md:px-20">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Logo & About */}
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-12 " />
          </div>
          <p className="text-white mt-8">
            Our family-centered approach to healthcare ensures that each member
            of your family receives personalized attention.
          </p>
          <div className="flex gap-4 mt-8 text-[#FFA377]">
            <a
              href="https://www.linkedin.com/company/zadroit-it-solution-private-limited/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://www.instagram.com/zadroit_it_services/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul className="text-white mt-8 space-y-2">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#pages">Pages</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#terms">Terms & Conditions</a>
            </li>
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
          </ul>
        </div>

        {/* Contact Details - Using React Icons */}
        <div>
          <h3 className="text-xl font-semibold">Contact Details</h3>
          <ul className="text-white mt-8 space-y-2">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#FFA377] text-5xl" /> 38/37B,
              Logi Chetty Street Number 1, Logi Street, Gugai, Salem, Tamil Nadu
              636006 Kuta
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#FFA377]" /> info@zadroit.com
            </li>

            <li className="flex items-center gap-2">
              <FaClock className="text-[#FFA377]" /> 8 AM - 5 PM, Monday -
              Friday
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold">Newsletter</h3>
          <p className="text-white font-bold mt-8">
            Subscribe To Our Newsletter
          </p>
          <p className="text-white mt-8">
            Stay informed and never miss out on the latest news, health tips.
          </p>
          <div className="mt-8 flex border border-[#FFA377] rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full p-2 bg-transparent text-white focus:outline-none"
            />
            <button className="bg-[#FFA377] px-4 py-2 text-black font-semibold">
              Send
            </button>
          </div>
        </div>
      </div>

      <hr className="border-[#FFA377] my-6" />

      {/* Copyright Section */}
      <p className="text-center text-white">
        Copyright 2025 © <span className="text-[#FFA377]">Medpredit</span> All
        Rights Reserved.
      </p>
    </footer>
  );
}
