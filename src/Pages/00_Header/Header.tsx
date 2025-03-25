
import logo from "../../assets/images/logo.svg";
import { useState } from "react";

export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [active, setActive] = useState("Home"); // Default active menu item

  const menuItems = [
    { name: "Home", id: "/#home" },
    { name: "About Us", id: "/#about" },
    { name: "Services", id: "/#services" },
    { name: "Pages", id: "/#pages" },
    { name: "Contact Us", id: "/#contact" },
    { name: "Terms & Condition", id: "/#terms" },
    { name: "Privacy Policy", id: "/#privacy" },
  ];

  return (
    <header className="w-full min-h-[10vh] h-auto bg-[#07332f] shadow-md relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-14" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 text-sm md:text-base lg:text-lg">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={`${item.id}`} // Update href to point to section IDs
              className={`transition ${
                active === item.name ? "text-[#F7A582]" : "text-white"
              } hover:text-[#F7A582]`}
              onClick={() => {
                setActive(item.name);
                setIsToggleOpen(false); // Close mobile menu if open
              }}
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Book Appointment Button */}
        {/* <div className="hidden md:flex justify-end">
          <button className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-3 md:px-5 lg:px-6 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white">
            <span className="leading-tight text-xs md:text-sm lg:text-base">
              Book
              <br />
              Appointment
            </span>
            <FaCalendarAlt />
          </button>
        </div> */}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsToggleOpen(!isToggleOpen)}
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isToggleOpen && (
          <div className="absolute top-full left-0 w-full bg-[#07332f] text-white flex flex-col items-center py-4 space-y-4 md:hidden z-50 shadow-lg">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={`${item.id}`} // Update href to point to section IDs
                className={`transition ${
                  active === item.name ? "text-[#F7A582]" : "text-white"
                } hover:text-[#F7A582]`}
                onClick={() => {
                  setActive(item.name);
                  setIsToggleOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            {/* <button className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-4 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white">
              <span>Book Appointment</span>
              <FaCalendarAlt />
            </button> */}
          </div>
        )}
      </div>
    </header>
  );
}
