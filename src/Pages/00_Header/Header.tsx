import logo from "../../assets/images/logo.svg";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [active, setActive] = useState("Home"); // Default active menu item
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", id: "/home#home" },
    { name: "About Us", id: "/home#about" },
    { name: "Services", id: "/home#services" },
    { name: "Pages", id: "/home#pages" },
    { name: "Contact Us", id: "/home#contact" },
    // { name: "Terms & Condition", id: "/terms#terms" },
    // { name: "Privacy Policy", id: "/privacy-policy#privacy" },
  ];

  let userDetails = localStorage.getItem("userDetails");
  let tokenObject: any = '';
  if (userDetails) {
    tokenObject = JSON.parse(userDetails ? userDetails : '');
  }
  // const token = tokenObject.token;

  // Function to scroll to section
  const scrollToSection = () => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100); // Small delay to ensure element exists
    }
  };

  // Scroll when URL hash changes
  useEffect(() => {
    scrollToSection();
  }, [location.hash]);

  // Handle navigation and scrolling
  const handleNavigation = (path: string) => {
    const [route, _hash] = path.split("#");

    if (location.pathname !== route) {
      navigate(route); // Navigate to the new route first
    } else {
      scrollToSection(); // Directly scroll if already on the same page
    }

    setActive(path);
    setIsToggleOpen(false);
  };

  return (
    <header className="w-full min-h-[10vh] h-auto bg-[#07332f] shadow-md relative">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-4 md:py-6 lg:py-8 flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 text-sm md:text-base lg:text-lg">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.id}
              className={`transition ${active === item.id ? "text-[#F7A582]" : "text-white"
                } hover:text-[#F7A582]`}
              onClick={() => handleNavigation(item.id)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsToggleOpen(!isToggleOpen)}
        >
          ☰
        </button>

        {
          tokenObject.firstName ? (
            <div className="hidden md:flex justify-end">
              <button onClick={() => { navigate("/dashboard"); setActive("dahboard") }} className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-3 md:px-5 lg:px-6 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white cursor-pointer">
                <span className="leading-tight text-xs md:text-sm lg:text-base">
                  {tokenObject.firstName} {tokenObject.lastName}
                </span>
                <FaUser />
              </button>
              <button onClick={() => { localStorage.clear(); navigate("/home#home"); setActive("home") }} className="ml-5 flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-3 md:px-5 lg:px-6 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white cursor-pointer">
                <span className="leading-tight text-xs md:text-sm lg:text-base">
                  Logout
                </span>
              </button>
            </div>
          ) : (
            <div className="hidden md:flex justify-end">
              <button onClick={() => { navigate("/login"); setActive("login") }} className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-3 md:px-5 lg:px-6 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white cursor-pointer">
                <span className="leading-tight text-xs md:text-sm lg:text-base">
                  Login
                </span>
                <FaUser />
              </button>
            </div >
          )
        }


        {/* Mobile Menu */}
        {
          isToggleOpen && (
            <div className="absolute top-full left-0 w-full bg-[#07332f] text-white flex flex-col items-center py-4 space-y-4 md:hidden z-50 shadow-lg">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.id}
                  className={`transition ${active === item.id ? "text-[#F7A582]" : "text-white"
                    } hover:text-[#F7A582]`}
                  onClick={() => handleNavigation(item.id)}
                >
                  {item.name}
                </Link>
              ))}
              <button className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-4 py-2 rounded-full w-auto max-w-[200px] transition hover:bg-[#F7A582] hover:text-white">
                <span>Login</span>
                <FaUser />
              </button>
            </div>
          )
        }
      </div >
    </header >
  );
}
