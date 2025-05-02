import React, { useEffect, useRef } from "react";
import dr1 from "../../assets/images/dr1.png";
import dr2 from "../../assets/images/dr2.png";
import dot from "../../assets/images/dot.png";
// import { FaHandHoldingMedical } from "react-icons/fa";
import dr3 from "../../assets/images/dr3.png";
import dr4 from "../../assets/images/dr4.png";
import dr5 from "../../assets/images/dr5.png";

// import img1 from "../../assets/images/img1.svg";
import { FcApproval } from "react-icons/fc";

import icon1 from "../../assets/images/service/icon1.svg";
import icon2 from "../../assets/images/service/icon2.svg";
import icon3 from "../../assets/images/service/icon3.svg";
import icon4 from "../../assets/images/service/icon4.svg";
import icon5 from "../../assets/images/service/icon5.svg";

import profile1 from "../../assets/images/Patient/patient1.png"
import profile2 from "../../assets/images/Patient/patient2.png"
import profile3 from "../../assets/images/Patient/patient3.png"
import profile4 from "../../assets/images/Patient/patient4.png"






// import selfs from "../../assets/images/selfs.svg";
// import history from "../../assets/images/history.svg";
// import keep from "../../assets/images/Keep.svg";
import suitcase from "../../assets/images/case.svg";
// import self from "../../assets/images/self.svg";
// import score from "../../assets/images/score.svg";
// import profile from "../../assets/images/profile.svg";
// import take from "../../assets/images/take.svg";
// import past from "../../assets/images/past.svg";
import grpdr from "../../assets/images/grpdr.png";
// import { FaCalendarCheck } from "react-icons/fa";
import treatmentbg from "../../assets/images/treatmentbg.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";

import grp1 from "../../assets/images/grp1.png";
import grp2 from "../../assets/images/grp2.png";
import grp3 from "../../assets/images/grp3.png";
import formimg from "../../assets/images/form.png";
import { motion } from "framer-motion";
// import CountUp from "react-countup";
import "./Home.css";
import { useSwipeable } from "react-swipeable";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";


// type ContactFormData = {
//   name: string;
//   email: string;
//   message: string;
//   phone?: string;
//   date?: string;
// };

const Home: React.FC = () => {
  console.log("hek");
  const testimonials = [
    {
      name: "Nirmal",
      role: "Patient",
      image: profile1,
      feedback:
        "MedPredit helped me understand my health risks and make better lifestyle choices. It’s an easy-to-use tool that gives valuable insights.",
    },
    {
      name: "Riya",
      role: "Patient",
      image: profile2,
      feedback:
        "Tracking my family’s health in one place has never been easier! I love how MedPredit provides personalized recommendations.",
    },
    {
      name: "Arjun",
      role: "Patient",
      image: profile3,
      feedback:
        "MedPredit gave me a clear picture of my health and what I need to improve. The insights are truly life-changing!",
    },
    {
      name: "Karan",
      role: "Patient",
      image: profile4,
      feedback:
        "With MedPredit, I can monitor my health trends effortlessly. It’s a must-have for anyone serious about their well-being!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  // const navigate = useNavigate();

  const[name,setName]=useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  
  const handleClick = () => {
    const to = "soniyateddy9791@gmail.com";
    const subject = encodeURIComponent(`Inquiry from ${name}`); // You can customize this
  
    const body = encodeURIComponent(
      `Dear Zadroit Team,\n\n` +
      `I hope this message finds you well.\n\n` +
      `${description}\n\n` +
     `Email : ${email}\n`+
     `Mobile Number : ${phone}\n\n`+
      `Best regards,\n` +
      `${name}\n`+
       `${phone}`
    );
  
    const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };
  
  



  useEffect(() => {
    const updateItemsPerView = () => {
      setItemsPerView(window.innerWidth >= 1024 ? 3 : 1);
    };
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setCurrentIndex((prev) => (prev + itemsPerView) % testimonials.length);
    } else {
      setCurrentIndex((prev) =>
        prev - itemsPerView < 0
          ? testimonials.length - itemsPerView
          : prev - itemsPerView
      );
    }
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    trackTouch: true,
    trackMouse: true,
  });

  const articles = [
    {
      title:
        " Why Early Detection Saves Lives: The Role of Predictive Tools in Modern Medicine",
      description:
        "Learn why predictive health tools are crucial for early diagnosis, disease prevention, and better patient outcomes—with real-world examples from MedPredit’s technology.",
      image: grp1,
      link: "#",
    },
    {
      title:
        "Managing Stress, Preventing Diabetes: Tips Backed by Predictive Healthcare",
      description:
        "Practical lifestyle tips to reduce stress and lower your diabetes risk—enhanced by insights from MedPredit’s predictive models.",
      image: grp2,
      link: "#",
    },
    {
      title:
        "Can AI Predict Stress-Induced Diabetes? Here's How MedPredit is Making It Possible",
      description:
        "Explore how MedPredit uses AI to analyze stress markers and lifestyle data to flag early warning signs of diabetes before symptoms appear.",
      image: grp3,
      link: "#",
    },
  ];
  const [_isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const faqs = [
    {
      question: " Is MedPredit a diagnostic tool?",
      answer:
        "No, MedPredit is designed for self-assessment and lifestyle tracking. It provides recommendations but does not replace professional medical advice. ",
    },
    {
      question: "Can I use MedPredit for my family? ",
      answer:
        " Yes! Our platform allows you to store and track health records for your entire family in one place.",
    },
    {
      question: "How often should I complete an assessment?",
      answer:
        "   We recommend taking the self-assessment regularly to monitor progress and adjust lifestyle habits accordingly. ",
    },
    {
      question: "Is my data secure on MedPredit?",
      answer:
        "Absolutely! We prioritize your privacy and ensure all health data is securely stored and protected. ",
    },
    {
      question: "Does MedPredit provide medical advice? ",
      answer:
        "No, MedPredit provides health insights and lifestyle recommendations, but we always advise consulting a healthcare professional for medical concerns. ",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  const services = [
    {
      icon: icon1,
      title: "Comprehensive Health Assessments ",
      description:
        "We go beyond basic tracking. Our app provides detailed assessments across multiple health categories to give you a complete picture of your well-being.You’ll be able to evaluate and monitor Physical activity, Dietary, Sleep, Hypertension, BMI, Smoking and alcohol habits etc. ",
    },
    // {
    //   icon: test,
    //   title: "Specialized Medical Consultations",
    //   description:
    //     "Expert guidance from specialists for personalized diagnosis and treatment",
    // },
    {
      icon: icon2,
      title: "Personalized Health Analysis ",
      description:
     "Our app offers personalized health reports, analysing your responses to the detailed questions in each category. The app provides scoring for each aspect of your health and gives you clear insights into areas of improvement. "    },
    {
      icon: icon3,
      title: " Lifestyle Recommendations ",
      description:
       "Based on the analysis, MedPredit offers customized lifestyle recommendations to help you improve your health. Whether it’s tweaking your diet, improving sleep, or making changes to your activity levels, we provide actionable steps for better health management "   },
    {
      icon: icon4,
      title: "Family Health Management ",
      description:
       "Our platform isn't just for individuals — it's designed to manage your entire family's health. From tracking each member's health assessments to storing medical records, MedPredit helps you keep everyone’s health in check from a single account. "   },
    {
      icon: icon5,
      title: " Visual Health Tracking  ",
      description:
        "We make it easy to visualize your progress with health trend graphs. These trends help you spot improvements or potential issues early, so you can take immediate action before things get worse. ",
    },
  ];

  // const handleSubmit = () => {
  //   console.log("Testing 244");


  //   const mailtoLink = `mailto:info@movenpack.ch?subject=Contact Request from ${encodeURIComponent(
  //     data.name
  //   )}&body=Dear Movenpack Team,%0D%0A%0D%0A
  // I would like to get in touch with you regarding the following:%0D%0A%0D%0A
  // Name: ${encodeURIComponent(data.name)}%0D%0A
  // Email: ${encodeURIComponent(data.email)}%0D%0A%0D%0A
  // Message:%0D%0A${encodeURIComponent(data.message)}%0D%0A%0D%0A
  // Please feel free to reach out to me at your earliest convenience.%0D%0A%0D%0A
  // Best regards,%0D%0A${encodeURIComponent(data.name)}`;

  //   window.location.href = mailtoLink;
  // };

  return (
    <div className="bg-[#fff7f3]">
      <div
        id="home"
        className="h-screen lg:h-[90vh] md:h-[80vh] bg-[#07332f] mt-0 p-6 md:p-12"
      >
        <div className="mt-0 flex flex-col lg:flex-row items-center px-6 md:px-12">
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <p className="text-sm text-white tracking-widest uppercase">
              Your Personal Health Tracker
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f89c7c] mt-2">
            Predict your health. Track your future
            </h1>
            <p className="text-white mt-4">
            With Medipredit, you can take proactive steps towards preventive and predictive healthcare, empowering informed decisions about your well-being. 
            </p>
            {/* Buttons */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
              <button
                className="bg-[#f89c7c] text-white px-6 py-2 rounded-md shadow-lg hover:bg-[#e37c5e] transition"
                onClick={() => {
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Read More
              </button>
              {/* <button className="flex items-center text-white">
                <FaPlay className="mr-2" />
                Watch Video
              </button> */}
            </div>
          </motion.div>

          {/* Right Side - Images */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
            style={{ backgroundImage: `url(${dot})` }}
            className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-10 lg:mt-0 relative bg-no-repeat bg-contain bg-right"
          >
            <motion.img
              src={dr1}
              alt="Doctor 1"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
              className="w-40 h-60 md:w-48 md:h-72 lg:w-50 lg:h-88 object-cover mx-5 lg:mx-10 mt-10 lg:mt-20 rounded-[40%] shadow-lg"
            />
            <motion.img
              src={dr2}
              alt="Doctor 2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
              className="w-40 h-60 md:w-48 md:h-72 lg:w-50 lg:h-88 object-cover rounded-[40%] shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      

      <div className="bg-[#fef6f3] p-6 md:p-12 lg:p-25">
        {/* Top Section - Contact Info */}
        <h5 className="text-xl md:text-2xl  flex justify-center mb-5 font-bold text-[#f89c7c]  tracking-widest uppercase">
               MedPredit Packages
            </h5>

        <div className="flex flex-wrap md:flex-nowrap">
          {/* Contact Info Box */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // ✅ Allows re-triggering on scroll
            className="bg-[#f89c7c] flex flex-col text-[#07332f] w-full md:w-1/3 lg:w-1/3 p-6 md:h-[250px] lg:h-[300px]"
          >
            <h3 className="text-2xl mt-5 md:mt-2 p-3 font-semibold">
             Basic Plan
            </h3>
            <p className="text-2xl mt-2 p-3 text-[#07332f] font-semibold">
             Package Applied for Primary user Only
                </p>
                <ul className="p-3 font-semibold list-disc pl-5">
                <li>
                  1 Member
                </li>
                <li>
                  365 Days Validity
                </li>
              </ul>

          </motion.div>

          {/* Family Health Box */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // ✅ Allows animation when scrolling up or down
            className="bg-[#07332f] p-6 text-white w-full md:w-1/3 lg:w-1/3 md:h-[250px] lg:h-[300px]"
          >
           
            <h3 className="text-lg font-semibold mt-5">Standard Plan</h3>
            <p className="text-sm mt-2 text-slate-300">
             Package Applied for Primary user + 1 Family Members
            </p>
            <ul className="p-3 font-semibold list-disc pl-5">
                <li>
                  1 + 1  Member
                </li>
                <li>
                  365 Days Validity
                </li>
                </ul>
          </motion.div>

          {/* 24 Hours Service Box */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // ✅ Animation re-triggers when scrolling up or down
            className="bg-[#07332f] p-6 text-white w-full md:w-1/3 lg:w-1/3 md:h-[250px] lg:h-[300px] border-t md:border-l md:border-t-0 border-white"
          >
                       <h3 className="text-lg font-semibold mt-5">Family Plan</h3>
            <p className="text-sm mt-2 text-slate-300">
             Package Applied for Primary user + 3 Family Members
            </p>
            <ul className="p-3 font-semibold list-disc pl-5">
                <li>
                  1 + 3  Member
                </li>
                <li>
                  365 Days Validity
                </li>
                </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }} // ✅ Animation re-triggers when scrolling up or down
            className="bg-[#07332f] p-6 text-white w-full md:w-1/3 lg:w-1/3 md:h-[250px] lg:h-[300px] border-t md:border-l md:border-t-0 border-white"
          >
                       <h3 className="text-lg font-semibold mt-5">Pro Plan</h3>
            <p className="text-sm mt-2 text-slate-300">
             Package Applied for Primary user + 5 Family Members
            </p>
            <ul className="p-3 font-semibold list-disc pl-5">
                <li>
                  1 + 5  Member
                </li>
                <li>
                  365 Days Validity
                </li>
                </ul>
          </motion.div>
        </div>

        <div className="mt-20 flex flex-wrap lg:flex-row md:flex-col">
          {/* Left - Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 0.2 }}
            className="lg:w-1/2 md:w-full flex flex-col items-center relative"
          >
            {/* Background Pattern */}
            <div
              className="absolute inset-0 bg-no-repeat bg-contain bg-center lg:w-[80%] md:w-full"
              style={{ backgroundImage: `url(${dot})` }}
            ></div>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 relative z-10">
              {/* Doctor 1 - Large Image */}
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ amount: 0.2 }}
                src={dr3}
                alt="Doctor 3"
                className="w-[250px] h-[300px] md:w-[200px] md:h-[300px] rounded-[40%] shadow-lg object-cover"
              />

              {/* Right Column */}
              <div className="flex flex-col gap-6">
                {/* Doctor 2 */}
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ amount: 0.2 }}
                  src={dr4}
                  alt="Doctor 4"
                  className="w-[180px] h-[230px] md:w-[150px] md:h-[200px] rounded-[40%] shadow-lg object-cover"
                />

                {/* Watch Video Section */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ amount: 0.2 }}
                  className="relative right-10 w-[200px] h-[120px] md:w-[160px] md:h-[100px] rounded-[40%] shadow-lg overflow-hidden"
                >
                  <img
                    src={dr5}
                    alt="Doctor 5"
                    className="absolute  w-full h-full object-cover opacity-60"
                  />
                  {/* Overlay for Watch Video */}
                  {/* <div className="absolute inset-0 flex flex-row justify-center items-center text-white">
                    <span className="text-3xl">
                      <FaCirclePlay />
                    </span>
                    <p className="text-sm ml-2 font-semibold">Watch Video</p>
                  </div> */}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Text Section */}
          <motion.div
            id="about"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ amount: 0.2 }}
            className="lg:w-1/2 md:w-full px-10"
          >
            <h5 className="text-xl md:text-2xl font-bold text-[#f89c7c]  tracking-widest uppercase">
              About MedPredit
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
            Predictive and Preventive Healthcare
            </h2>
           

            {/* Bullet Points */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-center">
                <FcApproval />{" "}
                <span className="ml-2">
                  Easy-to-use interface for seamless health tracking{" "}
                </span>
              </li>
              <li className="flex items-center">
                <FcApproval />{" "}
                <span className="ml-2">
                  Secure storage for medical records{" "}
                </span>
              </li>
              <li className="flex items-center">
                <FcApproval />{" "}
                <span className="ml-2">
                  Family health management under one account{" "}
                </span>
              </li>
            </ul>


            {/* Read More Button */}
            {/* <button className="mt-6 rounded-4xl border-2 border-[#f89c7c] text-[#f89c7c] px-6 py-2 shadow-lg active:bg-[#07332f] hover:bg-[#07332f] transition">
              Read More
            </button> */}
          </motion.div>
        </div>

        <section id="services" className="bg-[#FFF7F5] py-16 px-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Heading */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center mt-10"
            >
              <h3 className="text-xl md:text-2xl font-bold text-[#f89c7c] uppercase tracking-widest">
              How Medpredit works
              </h3>
              <h2 className="text-3xl md:text-4xl lg:text-4xl  mt-5 font-bold text-[#07332F]">
                Simplify health tracking for your entire family with MedPredit!
              </h2>
            </motion.div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50, // Left or Right Animation
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="relative overflow-hidden group border shadow-md cursor-pointer"
                >
                  {/* Background Hover Effect */}
                  <div className="absolute inset-0 bg-[#f7a582] origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"></div>

                  <div className="relative p-6 flex flex-col items-center transition-all duration-300 z-10">
                    <img
                      style={{ width: "20%", height: "50%" }}
                      src={service.icon}
                      alt="no Image"
                    />
                    <h3 className="text-xl text-center font-semibold mt-4 text-[#F4A38A] group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center mt-2 group-hover:text-gray-200">
                      {service.description}
                    </p>
                  </div>

                  {/* Button */}
                  {/* <motion.a
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="relative bg-[#F4A38A] text-white text-center py-3 font-semibold flex justify-center items-center gap-2 transition-all duration-300 z-10 group-hover:text-[#07332F]"
                  >
                    Read More <FaArrowRight />
                  </motion.a> */}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="bg-[#002E2C] w-full p-6 md:p-10 lg:p-16">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 lg:gap-16">
          {/* Left Side (Icon & Text) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 w-full md:w-[65%]"
          >
            <div className="w-12 h-12">
              <img
                src={suitcase}
                alt="case"
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Instal our app  
           
              </h2>
              <p className="text-gray-300 mt-2 text-sm md:text-base lg:text-lg max-w-lg">
              Unlock Smarter Health with MedPredit - Download MedPredit now and start tracking smarter today 
              </p>
            </div>
          </motion.div>

          {/* Right Side (Button) */}
          {/* <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-auto flex justify-center md:justify-end"
          >
           <div className="border border-[#F4A38A] text-[#F4A38A] px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2 hover:bg-[#F4A38A] hover:text-white transition-all duration-300">
  <img
    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=DummyQR"
    alt=" QR Code"
    className="w-12 h-12"
  />
   QR Code
</div>

          </motion.div> */}
        </div>
      </section>

      {/* <section className="bg-[#feefe9] px-6 py-16 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto">
       
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12"
          >
         
            <div className="w-full md:w-1/2 lg:w-[40%]">
              <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide ">
                How Medpredit  Works
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002E2C] mt-2 leading-tight">
                Revolutionizing Healthcare at Your Fingertips
              </h2>
            </div>

            
            <p className="w-full md:w-1/2 text-gray-600 text-sm md:text-base lg:text-lg">
            Trust Medpredit for personalized health solutions backed by scientific expertise and delivered with care. Let us be your trusted partner in achieving and maintaining optimal health. 
            </p>
          </motion.div>

       
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { img: self, text: "Complete the Self-Assessment  " },
              { img: score, text: "Receive Your Health Score  " },
              { img: take, text: "Take Action  " },
              { img: past, text: "View Past Health Records   " },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.img}
                  alt={item.text}
                  style={{ width: "40%", height: "30%" }}
                  className=" md:w-24 md:h-24 mx-auto"
                />
                <p className="mt-2 text-lg md:text-xl font-semibold text-[#002E2C]">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="bg-[#FFF7F3] py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
          {/* Left Side - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full md:w-[45%] lg:w-[40%]"
          >
            <img
              src={grpdr}
              alt="Doctors"
              className="w-full rounded-lg shadow-lg"
            />

            {/* Floating Stats */}
            {/* <motion.div
              ref={sectionRef} // Attaching ref to track visibility
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="absolute top-[80%] md:top-[90%] lg:top-[85%] right-0 flex gap-1"
            >
              <div className="bg-[#023E36] text-white p-6 md:p-8 lg:p-10 w-36 h-28 md:w-40 md:h-30 text-center">
                <p className="text-3xl font-bold">
                  {isVisible ? (
                    <CountUp start={0} end={100} duration={1} />
                  ) : (
                    "0"
                  )}
                  +
                </p>
                <p className="text-sm">Doctors</p>
              </div>
              <div className="bg-[#F4A38A] text-white p-6 md:p-8 lg:p-10 w-36 h-28 md:w-40 md:h-30 text-center">
                <p className="text-3xl font-bold">
                  {isVisible ? (
                    <CountUp start={0} end={16} duration={1} />
                  ) : (
                    "0"
                  )}
                  +
                </p>
                <p className="text-sm">World Office</p>
              </div>
            </motion.div> */}
          </motion.div>

          {/* Right Side - FAQ */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full md:w-[50%] lg:w-[55%]"
          >
            <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide ">
              FAQs
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002E2C] mt-2 leading-tight">
            Curious about MedPredict? Let’s clear things up together. 
            </h2>

            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="mt-8 space-y-4"
            >
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="pb-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <button
                    className="flex justify-between items-center w-full text-lg md:text-xl font-medium text-[#002E2C]"
                    onClick={() =>
                      setOpenIndex(index === openIndex ? -1 : index)
                    }
                  >
                    {faq.question}
                    {index === openIndex ? (
                      <FaMinus className="text-[#002E2C]" />
                    ) : (
                      <FaPlus className="text-[#002E2C]" />
                    )}
                  </button>
                  {index === openIndex && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#023E36] py-16 px-10">
        <div className="max-w-6xl mx-auto p-10">
          <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide ">
            Testimonial
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-white mt-2">
            What Users Say
          </h2>

          <div
            {...swipeHandlers}
            className="relative flex items-center justify-center mt-10"
          >
            <button
              className="absolute left-0 text-black rounded-full shadow-lg"
              onClick={() => handleSwipe("right")}
            >
              <GrPrevious />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-transform duration-300">
              {testimonials
                .slice(currentIndex, currentIndex + itemsPerView)
                .map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 shadow-lg rounded-lg text-center"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                    />
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                    <p className="text-gray-700 mt-2">{testimonial.feedback}</p>
                  </div>
                ))}
            </div>
            <button
              className="absolute right-0  text-black rounded-full shadow-lg"
              onClick={() => handleSwipe("left")}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </section>

      <section id="pages" className="bg-[#fef6f2] mt-40 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[#f7a582] text-xl md:text-2xl font-bold uppercase">
            upcoming Blogs
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
            Latest News & Articles.
          </h2>

          {/* Grid Layout with Scroll Animation */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {articles.map((article, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUpVariants}
                className="bg-[#fef6f2] p-4"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-5 text-gray-900">
                  {article.title}
                </h3>
                <p className="text-[#07332f] text-sm mt-5">
                  {article.description}
                </p>
                {/* <a
                  href={article.link}
                  className="text-[#f7a582] font-extralight mt-2 inline-block"
                >
                  Read More →
                </a> */}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="relative bg-cover bg-center py-16 px-6"
        style={{
          backgroundImage: `url(${treatmentbg})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Contact Form
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideInVariants}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#043d36] rounded-lg shadow-lg overflow-hidden"
        >
          {/* Left Side - Info & Illustration */}
          <div className="flex flex-col justify-center items-center bg-[#f7a582] text-center w-[80%]">
            <img src={formimg} alt="Appointment" className="w-50 h-50 mb-4" />
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
            <p className="text-white text-lg mt-2">
              Have questions? We’re here to help!
            </p>
            <p className="text-white text-lg font-medium mt-2">
              Take charge of your health with{" "}
              <span className="font-bold">MedPredit!</span>
            </p>
          </div>

          {/* Right Side - Form */}
          <form>
            <div className="p-8">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                    className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                  />
                   <input
                    type="text"
                    placeholder="Your Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
            
                    className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                  />
                  
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[100%] md:w-[204%] lg:w-[204%]">
                 
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
            
                    className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                  />
                  {/* <input
                    type="date"
                    className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                  /> */}
                </div>
                <textarea
                  placeholder="Your Message"
                  name="message"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
          
                  rows={4}
                  className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                ></textarea>

                <button
                  className="w-[25%] p-3 bg-transparent border-2 border-[#f7a582] text-[#f7a582] rounded-full font-semibold hover:bg-white hover:text-[#f7a582] transition duration-300"
                  onClick={handleClick}

                >
                  Send
                </button>
              </form>
            </div>
          </form>
        </motion.div>
      </section>

      {/* <section id="terms">
        <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
          <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-semibold text-[#0F3B36] mb-6 text-center">
              Medpredit Terms and Conditions
            </h1>
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Welcome to Medpredit! These Terms and Conditions ("Terms")
                govern your use of the Medpredit mobile application ("App"),
                operated by Medpredit Technologies ("we," "our," "us").
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                1. Introduction
              </h2>
              <p>
                Medpredit provides healthcare-related services, including online
                consultations, appointment scheduling, prescription management,
                health tracking, and other services. By using the App, you agree
                to comply with these Terms.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                2. Acceptance of Terms
              </h2>
              <p>
                By using Medpredit, you confirm that you accept and agree to
                these Terms. If you do not agree, you should discontinue using
                the App immediately.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                3. Services Provided
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  Online Consultations: Connect with licensed healthcare
                  providers.
                </li>
                <li>
                  Appointment Booking: Schedule appointments with healthcare
                  professionals.
                </li>
                <li>
                  Prescription Management: Manage and track your prescriptions.
                </li>
                <li>
                  Health Record Management: Securely store, access, and share
                  your medical records.
                </li>
                <li>
                  Health Content and Tools: Access informative articles and
                  monitoring tools.
                </li>
              </ul>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                4. User Eligibility
              </h2>
              <p>
                To use Medpredit, you must be at least 18 years old or have
                parental consent.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                5. Registration and Account
              </h2>
              <p>
                You are responsible for maintaining the confidentiality of your
                account credentials and ensuring the accuracy of your provided
                information.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                6. Use of the App
              </h2>
              <p>
                Users must not disrupt the service, impersonate others, or
                upload harmful content.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                7. Healthcare Services
              </h2>
              <p>
                The services provided through Medpredit do not replace in-person
                medical care. Always consult a physician for medical decisions.
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                8. Privacy Policy
              </h2>
              <p>
                Your data is protected according to our{" "}
                <a href="/#privacy" className="text-blue-500 underline">
                  Privacy Policy
                </a>
                .
              </p>
              <h2 className="text-2xl font-semibold text-[#0F3B36]">
                9. Contact Information
              </h2>
              <p>
                For any inquiries, contact Medpredit Technologies at:
                <br />
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:info@zadroit.com"
                  className="text-blue-500 underline"
                >
                  info@zadroit.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section id="privacy">
        <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
          <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
            <h1 className="text-3xl font-bold text-[#0F3B36] mb-6">
              Medpredit Privacy Policy
            </h1>

            <p className="text-lg leading-relaxed">
              Medpredit Technologies ("Medpredit," "we," "our," or "us") is
              committed to protecting your privacy and ensuring that your
              personal information is handled in a safe and responsible manner.
              This Privacy Policy outlines how we collect, use, disclose, and
              safeguard your information when you use the Medpredit mobile
              application ("App") and its associated services. By using the App,
              you consent to the collection and use of your personal data as
              described in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              1. Information We Collect
            </h2>

            <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">
              A. Personal Information:
            </h3>
            <p className="text-lg leading-relaxed">
              Account Information: When you register for the App, we collect
              your name, email address, phone number, and other contact details.
            </p>

            <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">
              B. Health Information:
            </h3>
            <p className="text-lg leading-relaxed">
              Health Records: We may collect data related to symptoms,
              diagnoses, and medical consultations.
            </p>

            <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">
              C. Usage Data:
            </h3>
            <p className="text-lg leading-relaxed">
              App Activity: We collect information about how you interact with
              the App, including your IP address and device details.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              2. How We Use Your Information
            </h2>
            <p className="text-lg leading-relaxed">
              We use the collected information to provide healthcare services,
              improve our platform, communicate with users, and comply with
              legal obligations.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              3. Sharing of Your Information
            </h2>
            <p className="text-lg leading-relaxed">
              Your data is shared with healthcare providers, service partners,
              and legal authorities where necessary.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              4. Data Retention & Security
            </h2>
            <p className="text-lg leading-relaxed">
              We retain your data only as long as necessary and employ security
              measures to protect your personal information.
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              5. Your Rights and Choices
            </h2>
            <p className="text-lg leading-relaxed">
              You have the right to access, update, delete, or opt out of data
              collection. Contact us at [Your Contact Information].
            </p>

            <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">
              6. Changes to This Policy
            </h2>
            <p className="text-lg leading-relaxed">
              We may update this Privacy Policy periodically. The latest version
              will always be available on our platform.
            </p>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;
