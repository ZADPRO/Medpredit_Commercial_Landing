import logo from "../../assets/images/logo.svg";
import { useState, useEffect, useRef } from "react";
import { FaUser } from "react-icons/fa";
// import { FcDisplay } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [active, setActive] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Home", id: "/home#home" },
    { name: "About Us", id: "/home#about" },
    { name: "Services", id: "/home#services" },
    {
      name: "Blogs",
      subItems: [
        { name: "General Blogs", id: "/home#pages" },
        { name: "Achievements", id: "/home#achievements" },
        { name: "Version Updates", id: "/home#versions" },
      ],
    },
    { name: "Contact Us", id: "/home#contact" },
  ];

  let userDetails = localStorage.getItem("userDetails");
  let tokenObject = userDetails ? JSON.parse(userDetails) : {};

  const scrollToSection = () => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  useEffect(() => {
    scrollToSection();
  }, [location.hash]);

  const handleNavigation = (path: any) => {
    const [route] = path.split("#");
    if (location.pathname !== route) {
      navigate(route);
    } else {
      // console.log('line ------ 58', )
      // scrollToSection();
      navigate(path);
    }
    setActive(path);
    setIsToggleOpen(false);
    setDropdownOpen(false);
  };

  const excludedRoutes = ["/subscription"];
  const shouldShowHeader = !excludedRoutes.includes(location.pathname);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return shouldShowHeader ? (
    <header className="fixed  top-0 left-0 w-full z-50 bg-[#07332f] shadow-md">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-10 py-4  flex justify-between items-center flex-wrap">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 md:h-12 lg:h-14" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8 text-sm md:text-base lg:text-lg relative">
          {menuItems.map((item, idx) =>
            item.subItems ? (
              <div className="relative" key={idx} ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`cursor-pointer transition flex items-center gap-1 ${
                    dropdownOpen ? "text-[#F7A582]" : "text-white"
                  } hover:text-[#F7A582]`}
                >
                  {item.name}
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 bg-[#07332f] mt-2 w-52 z-50 rounded shadow-lg">
                    {item.subItems.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        onClick={() => {
                          console.log("sub.id", sub.id);
                          handleNavigation(sub.id);
                        }}
                        className="px-4 py-2 text-white  hover:bg-[#0c4e45] cursor-pointer"
                      >
                        {sub.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.id}
                className={`transition ${
                  active === item.id ? "text-[#F7A582]" : "text-white"
                } hover:text-[#F7A582]`}
                onClick={() => {
                  console.log("Nav log", item.id);
                  handleNavigation(item.id);
                }}
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsToggleOpen(!isToggleOpen)}
        >
          ☰
        </button>

        {/* Desktop Buttons */}
        {tokenObject.firstName ? (
          <div className="hidden md:flex justify-end">
            <button
              onClick={() => {
                const path =
                  tokenObject.roleType === 6 ? "/admindashboard" : "/dashboard";
                navigate(path);
                setActive("dashboard");
              }}
              className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
            >
              <span>
                {tokenObject.firstName} {tokenObject.lastName}
              </span>
              <FaUser />
            </button>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/home#home");
                setActive("home");
              }}
              className="ml-5 flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
            >
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <>
          </>
          // <div className="hidden md:flex justify-end">
          //   <button
          //     onClick={() => {
          //       navigate("/login");
          //       setActive("login");
          //     }}
          //     className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
          //   >
          //     <span>Login</span>
          //     <FaUser />
          //   </button>
          // </div>
        )}

        {/* Mobile Menu */}
        {isToggleOpen && (
          <div className="absolute top-full left-0 w-full bg-[#07332f] text-white flex flex-col items-center py-4 space-y-4 md:hidden z-50 shadow-lg">
            {menuItems.map((item, idx) =>
              item.subItems ? (
                <div key={idx} className="w-full text-center">
                  <p className="text-[#F7A582] font-semibold">{item.name}</p>
                  {item.subItems.map((sub, subIdx) => (
                    <div
                      key={subIdx}
                      onClick={() => {
                        handleNavigation(sub.id);
                        setIsToggleOpen(false);
                      }}
                      className="text-white text-sm py-1 cursor-pointer hover:text-[#F7A582]"
                    >
                      {sub.name}
                    </div>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.id}
                  className={`transition ${
                    active === item.id ? "text-[#F7A582]" : "text-white"
                  } hover:text-[#F7A582]`}
                  onClick={() => {
                    handleNavigation(item.id);
                    setIsToggleOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              )
            )}

            {tokenObject.firstName ? (
              <>
                <button
                  onClick={() => {
                    const path =
                      tokenObject.roleType === 6 ? "/admindashboard" : "/dashboard";
                    navigate(path);
                    setActive("dashboard");
                    setIsToggleOpen(false);
                  }}
                  className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
                >
                  <span>
                    {tokenObject.firstName} {tokenObject.lastName}
                  </span>
                  <FaUser />
                </button>
                <button
                  onClick={() => {
                    localStorage.clear();
                    navigate("/home#home");
                    setActive("home");
                    setIsToggleOpen(false);
                  }}
                  className="mt-2 flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              // <button
              //   onClick={() => {
              //     navigate("/login");
              //     setActive("login");
              //     setIsToggleOpen(false);
              //   }}
              //   className="flex items-center space-x-2 border-2 border-[#F7A582] text-[#F7A582] px-5 py-2 rounded-full transition hover:bg-[#F7A582] hover:text-white"
              // >
              //   <span>Login</span>
              //   <FaUser />
              // </button>
              <></>
            )}
          </div>
        )}
      </div>
    </header>
  ) : null;
}
