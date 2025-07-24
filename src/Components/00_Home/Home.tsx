import React, { useEffect, useRef } from "react";
import dr1 from "../../assets/images/dr1.png";
import dr2 from "../../assets/images/dr2.png";
import dot from "../../assets/images/dot.png";
// import { FaHandHoldingMedical } from "react-icons/fa";
import dr3 from "../../assets/images/dr3.png";
import dr4 from "../../assets/images/dr4.png";
import dr5 from "../../assets/images/dr5.png";
import axios from "axios";
// import { FaUserAlt } from "react-icons/fa";
// import img1 from "../../assets/images/img1.svg";
import { FcApproval } from "react-icons/fc";
// import { FaStar, FaRegStar, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";

import icon1 from "../../assets/images/service/icon1.svg";
import icon2 from "../../assets/images/service/icon2.svg";
import icon3 from "../../assets/images/service/icon3.svg";
import icon4 from "../../assets/images/service/icon4.svg";
import icon5 from "../../assets/images/service/icon5.svg";

// import profile1 from "../../assets/images/Patient/patient1.png";
// import profile2 from "../../assets/images/Patient/patient2.png";
// import profile3 from "../../assets/images/Patient/patient3.png";
// import profile4 from "../../assets/images/Patient/patient4.png";

import grpdr from "../../assets/images/grpdr1.jpg";

import treatmentbg from "../../assets/images/treatment.svg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useState } from "react";
import { Toast } from "primereact/toast";

import formimg from "../../assets/images/form.png";
// import { motion } from "framer-motion";
// import CountUp from "react-countup";
import "./Home.css";
// import { useSwipeable } from "react-swipeable";
// import { GrPrevious } from "react-icons/gr";
// import { GrNext } from "react-icons/gr";
import { decryptAPIResponse } from "../../utils";
import feedback from "../../assets/images/Feedback[1].png";
import { Rating } from "primereact/rating";
import Seo from "../Seo";

interface BlogArray {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  refBlogId: string;
  signedImageUrl: string;
}

const Home: React.FC = () => {
  const toast = useRef<Toast>(null);

  const BlogContent: BlogArray = {
    blogTitle:
      "Why a Mobile Health Assistant is the Future of Family Health Assessment",
    blogContent: "",
    blogImage: "",
    refBlogId: "static-blog-001",
    signedImageUrl: blogsimg, // Use imported image, not string "blogsimg"
  };

  // const testimonials = [
  //   {
  //     name: "Nirmal",
  //     role: "Patient",
  //     image: profile1,
  //     feedback:
  //       "MedPredit helped me understand my health risks and make better lifestyle choices. It's an easy-to-use tool that gives valuable insights.",
  //   },
  //   {
  //     name: "Riya",
  //     role: "Patient",
  //     image: profile2,
  //     feedback:
  //       "Tracking my family's health in one place has never been easier! I love how MedPredit provides personalized recommendations.",
  //   },
  //   {
  //     name: "Arjun",
  //     role: "Patient",
  //     image: profile3,
  //     feedback:
  //       "MedPredit gave me a clear picture of my health and what I need to improve. The insights are truly life-changing!",
  //   },
  //   {
  //     name: "Karan",
  //     role: "Patient",
  //     image: profile4,
  //     feedback:
  //       "With MedPredit, I can monitor my health trends effortlessly. It's a must-have for anyone serious about their well-being!",
  //   },
  // ];

  // const [_currentIndex, setCurrentIndex] = useState(0);
  const [_itemsPerView, setItemsPerView] = useState(1);
  // const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [feedbackData, setFeedbackData] = useState({
    userName: "",
    useremail: "",
    reviewContent: "",
    ratings: "",
  });

  const handleFeedbackSubmit = async () => {
    console.log("Feedback Data:", feedbackData);
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/userReviews",
        {
          userName: feedbackData.userName,
          useremail: feedbackData.useremail,
          reviewContent: feedbackData.reviewContent,
          ratings: parseInt(feedbackData.ratings),
        }
      );

      const data = decryptAPIResponse(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );
      console.log("Feedback Response:", data);

      if (data.status === true) {
        setFeedbackData({
          userName: "",
          useremail: "",
          reviewContent: "",
          ratings: "",
        });
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: "Feedback submitted successfully",
          life: 3000,
        });
      } else {
        console.error("Feedback submission failed: Server returned error");
      }
    } catch (error) {
      console.error("Feedback submission failed", error);
    }
  };

  // const navigate = useNavigate();
  const [blogs, _setBlogs] = useState<BlogArray[]>([BlogContent]);
  const [_userReviews, setUserReviews] = useState<any[]>([]);
  const [_achievement, setAchievement] = useState<any[]>([]);
  const [_version, setVersion] = useState<any[]>([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const handleClick = () => {
    const to = "info@zadroit.com";
    const subject = encodeURIComponent(`Inquiry from ${name}`); // You can customize this

    const body = encodeURIComponent(
      `Dear Zadroit Team,\n\n` +
        `I hope this message finds you well.\n\n` +
        `${description}\n\n` +
        `Email : ${email}\n` +
        `Mobile Number : ${phone}\n\n` +
        `Best regards,\n` +
        `${name}\n` +
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

  // const handleSwipe = (direction: "left" | "right") => {
  //   if (direction === "left") {
  //     setCurrentIndex((prev) => (prev + itemsPerView) % testimonials.length);
  //   } else {
  //     setCurrentIndex((prev) =>
  //       prev - itemsPerView < 0
  //         ? testimonials.length - itemsPerView
  //         : prev - itemsPerView
  //     );
  //   }
  // };

  // const swipeHandlers = useSwipeable({
  //   onSwipedLeft: () => handleSwipe("left"),
  //   onSwipedRight: () => handleSwipe("right"),
  //   trackTouch: true,
  //   trackMouse: true,
  // });

  // Animation variants
  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  // };

  // const getStatusColor = (status: any) => {
  //   switch (status) {
  //     case "Latest":
  //       return "bg-green-100 text-green-800 border-green-200";
  //     case "Stable":
  //       return "bg-blue-100 text-blue-800 border-blue-200";
  //     case "Previous":
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200";
  //     case "Archive":
  //       return "bg-gray-100 text-gray-800 border-gray-200";
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-200";
  //   }
  // };

  // const formatDate = (dateString: any) => {
  //   return new Date(dateString).toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  // const fetchBlogs = () => {
  //   axios
  //     .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listBlogs", {
  //       headers: {
  //         Authorization: localStorage.getItem("token"),
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       const data = decryptAPIResponse(
  //         response.data[1],
  //         response.data[0],
  //         import.meta.env.VITE_ENCRYPTION_KEY
  //       );
  //       console.log("data setBlogs------------>", data);

  //       if (data.status === true) {
  //         localStorage.setItem("token", "Bearer " + data.token);
  //         console.log("setBlogs  --------->", data);
  //         // setBlogs(data.blogsForUser);
  //         setBlogs([BlogContent, ...data.forUserAllBlogs]);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log("Error fetching Blogs:", e);
  //     });
  // };

  const fetchAchievements = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listAchievement", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = decryptAPIResponse(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Before setAchievements------------>", data);

        if (data.status === true) {
          console.log("After setAchievements  --------->", data.result);
          setAchievement(data.result);
        }
      })
      .catch((e) => {
        console.log("Error fetching Achievements:", e);
      });
  };

  const fetchUserReview = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listReviews", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = decryptAPIResponse(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("data setUserReviews------------>", data);

        if (data.status === true) {
          localStorage.setItem("token", "Bearer " + data.token);
          console.log("setUserReviews  --------->", data);
          setUserReviews(data.result);
        }
      })
      .catch((e) => {
        console.log("Error fetching Blogs:", e);
      });
  };
  const fetchVersion = () => {
    axios
      .get(import.meta.env.VITE_API_URL + "/WebsiteRoutes/listRelease", {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = decryptAPIResponse(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );
        console.log("Before fetchVersion------------>", data);

        if (data.status === true) {
          console.log("After fetchVersion  --------->", data.forUser);
          setVersion(data.forUser);
        }
      })
      .catch((e) => {
        console.log("Error fetching fetchVersion:", e);
      });
  };

  useEffect(() => {
    // fetchBlogs();
    fetchUserReview();
    fetchAchievements();
    fetchVersion();
  }, []);

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
  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  // };

  // const slideInVariants = {
  //   hidden: { opacity: 0, x: -100 },
  //   visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  // };

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
        "We go beyond basic tracking. Our app provides detailed assessments across multiple health categories to give you a complete picture of your well-being.You'll be able to evaluate and monitor Physical activity, Dietary, Sleep, Hypertension, BMI, Smoking and alcohol habits etc. ",
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
        "Our app offers personalized health reports, analysing your responses to the detailed questions in each category. The app provides scoring for each aspect of your health and gives you clear insights into areas of improvement. ",
    },
    {
      icon: icon3,
      title: " Lifestyle Recommendations ",
      description:
        "Based on the analysis, MedPredit offers customized lifestyle recommendations to help you improve your health. Whether it's tweaking your diet, improving sleep, or making changes to your activity levels, we provide actionable steps for better health management.",
    },
    {
      icon: icon4,
      title: "Family Health Management ",
      description:
        "Our platform isn't just for individuals — it's designed to manage your entire family's health. From tracking each member's health assessments to storing medical records, MedPredit helps you keep everyone's health in check from a single account. ",
    },
    {
      icon: icon5,
      title: " Visual Health Tracking  ",
      description:
        "We make it easy to visualize your progress with health trend graphs. These trends help you spot improvements or potential issues early, so you can take immediate action before things get worse. ",
    },
  ];

  return (
    <>
      <Seo
        title="Welcome to Medpredit - Health & Wellness"
        description="Explore our health diagnostics, wellness solutions, and treatment services. Your health is our priority."
        keywords={[
          "health spikes",
          "wb health opd",
          "imperial blue alcohol percentage",
          "acupressure health care products",
          "mri ct scan price",
          "master health checkup in coimbatore",
          "millet health mix",
          "mini militia unlimited health",
          "robotic knee replacement cost",
          "ear hole stitching",
          "health care diagnostic center",
          "up health family welfare",
          "your health is our priority",
          "tattoo removal service near me",
          "lifeline diagnostics",
          "stress relief ayurvedic medicine",
          "health tonic for ladies",
          "heritage health claim status",
          "summer health tips",
          "family health services",
          "calories burned in 5km run",
          "mole removal cost",
          "whole body mri cost",
          "gym bill",
          "gym bicep machine",
          "well woman clinic",
          "stomach fat removal surgery cost",
          "physiotherapy prices near me",
          "anti stress mask",
          "acupressure health care system",
          "amazon health essentials quiz answers",
          "health first diagnostics",
          "health sense weighing scale",
          "up health",
          "health assistant",
          "health checkup packages in pune",
          "body ct scan cost",
          "lung ct scan cost",
          "alcohol detector",
          "stress echo test price",
          "stressed assets",
          "health committee in india",
          "mental aptitude test",
          "self survey",
          "breezer alcohol percentage india",
          "health camp",
          "metal tester",
          "depression treatment near me",
          "general mental ability questions",
          "youth problems",
          "cardiac stress test cost",
          "bmi machine",
          "focus diagnostics and health care centre",
          "female health check up",
          "is breezer good for health",
          "joint director of health services",
          "principles of mental health",
          "wellhealth ayurvedic health tips",
          "mind hospital",
          "stress test near me",
          "healthcare apps in india",
          "healthcare apps for doctors",
          "medical quiz questions",
          "viral screening test",
          "psychiatrist near me for depression and anxiety",
          "stress echo test near me",
          "stress interview",
          "stress test cost",
          "bmi test near me",
          "bmi weight machine",
          "medical health and family welfare department uttar pradesh",
          "ultrasound price",
          "best ayurvedic medicine for stress and anxiety",
          "1 quarter alcohol ml in india",
          "alcohol testing machine",
          "bmi calculator machine",
          "health and family welfare hp",
          "blood group test near me",
          "heart test near me",
          "bmi machine for gym",
          "principal stress formula",
          "health and family welfare department himachal pradesh",
          "gynecomastia surgery cost",
          "open gym near me",
          "gym in btm 2nd stage",
          "depression dr near me",
          "stress relief mudra",
          "family health records",
          "health and family welfare training centre",
          "doctors for depression and anxiety near me",
          "healthy lifestyle essay",
          "well health tips in hindi wellhealthorganic",
          "family health clinic",
          "gym in calicut",
          "mental age test",
          "family health assessment",
          "health assessment of infant",
          "health and family welfare department gujarat",
          "mental health calculator",
          "anxiety in kannada",
          "family health care clinic",
          "beetroot protein per 100g",
          "lucas test for alcohol",
          "free counseling",
          "health tips in tamil",
          "health tips in telugu",
        ]}
      />
      <div className="bg-[#fff7f3]">
        <div
          id="home"
          className="h-screen lg:h-[90vh] md:h-[80vh] bg-[#07332f]  p-6 md:p-12"
        >
          <div className="mt-0 flex flex-col lg:flex-row items-center px-6 md:px-12">
            {/* Left Side - Text Content */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // // transition={{ duration: 1, ease: "easeOut" }}
              // // transition={{ duration: 0, delay: 0 }}
              // viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <p className="text-sm text-white tracking-widest uppercase">
                Your Personal Health Tracker
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-[#f89c7c] mt-2">
                Predict your health. Track your future
              </h1>
              <p className="text-white mt-4">
                With Medipredit, you can take proactive steps towards preventive
                and predictive healthcare, empowering informed decisions about
                your well-being.
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
            </div>

            {/* Right Side - Images */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // // transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              // transition={{ duration: 1, delay: 0.1 }}
              // viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
              style={{ backgroundImage: `url(${dot})` }}
              className="w-full lg:w-1/2 flex justify-center lg:justify-end items-center mt-10 lg:mt-0 relative bg-no-repeat bg-contain bg-right"
            >
              <img
                src={dr1}
                alt="Doctor 1"
                // initial={{ opacity: 0, x: -50 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ duration: 1, delay: 0.4 }}
                // viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
                className="w-40 h-60 md:w-48 md:h-72 lg:w-50 lg:h-88 object-cover mx-5 lg:mx-10 mt-10 lg:mt-20 rounded-[40%] shadow-lg"
              />
              <img
                src={dr2}
                alt="Doctor 2"
                // initial={{ opacity: 0, x: -50 }}
                // whileInView={{ opacity: 1, x: 0 }}
                // transition={{ duration: 1, delay: 0.6 }}
                // viewport={{ once: true, amount: 0.2 }} // Works when scrolling down and up
                className="w-40 h-60 md:w-48 md:h-72 lg:w-50 lg:h-88 object-cover rounded-[40%] shadow-lg"
              />
            </div>
          </div>
        </div>

        <div className="bg-[#fef6f3] p-6 lg:mt-0 md:mt-0 mt-20 md:p-12 lg:p-25">
          {/* Top Section - Contact Info */}
          <h5 className="text-xl md:text-2xl  flex justify-center mb-5 font-bold text-[#f89c7c]  tracking-widest uppercase">
            MedPredit Packages
          </h5>

          <h2 className="text-3xl flex mb-5 justify-center md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
            365 Days Validity
          </h2>

          <div className="flex flex-wrap md:flex-nowrap">
            {/* Contact Info Box */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, ease: "easeOut" }}
              // viewport={{ once: true, amount: 0.2 }} // ✅ Allows re-triggering on scroll
              className="bg-[#f89c7c] flex flex-col text-[#07332f] w-full md:w-1/3 lg:w-1/3 p-6 md:h-[250px] lg:h-[300px]"
            >
              <h3 className="text-2xl mt-5 md:mt-2 p-3 font-semibold">
                Basic Plan
              </h3>
              <p className="text-2xl mt-2 p-3 text-[#07332f] font-semibold">
                Package Applied for Primary user Only
              </p>
            </div>

            {/* Family Health Box */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              // viewport={{ once: true, amount: 0.2 }} // ✅ Allows animation when scrolling up or down
              className="bg-[#07332f] p-6 text-white w-full md:w-1/3 lg:w-1/3 md:h-[250px] lg:h-[300px]"
            >
              <h3 className="text-2xl mt-5 md:mt-2 p-3 font-semibold">
                Standard Plan
              </h3>
              <p className="text-2xl mt-2 p-3 text-white font-semibold">
                Package Applied for Primary user + 1 Family Members
              </p>
            </div>

            {/* 24 Hours Service Box */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              // viewport={{ once: true, amount: 0.2 }} // ✅ Animation re-triggers when scrolling up or down
              className="bg-[#f89c7c] flex flex-col text-[#07332f] w-full md:w-1/3 lg:w-1/3 p-6 md:h-[250px] lg:h-[300px]"
            >
              <h3 className="text-2xl mt-5 md:mt-2 p-3 font-semibold">
                Family Plan
              </h3>
              <p className="text-2xl mt-2 p-3 text-[#07332f] font-semibold">
                Package Applied for Primary user + 3 Family Members
              </p>
            </div>
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              // viewport={{ once: true, amount: 0.2 }} // ✅ Animation re-triggers when scrolling up or down
              className="bg-[#07332f] p-6 text-white w-full md:w-1/3 lg:w-1/3 md:h-[250px] lg:h-[300px] border-t md:border-l md:border-t-0 border-white"
            >
              <h3 className="text-2xl mt-5 md:mt-2 p-3 font-semibold">
                Pro Plan
              </h3>
              <p className="text-2xl mt-2 p-3 text-white font-semibold">
                Package Applied for Primary user + 5 Family Members
              </p>
            </div>
          </div>

          <div className="mt-20 flex flex-wrap lg:flex-row md:flex-col">
            {/* Left - Images Section */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, ease: "easeOut" }}
              // viewport={{ amount: 0.2 }}
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
                <img
                  // initial={{ opacity: 0, x: -50 }}
                  // whileInView={{ opacity: 1, x: 0 }}
                  // transition={{ duration: 0.8, delay: 0.2 }}
                  // viewport={{ amount: 0.2 }}
                  src={dr3}
                  alt="Doctor 3"
                  className="w-[250px] h-[300px] md:w-[200px] md:h-[300px] rounded-[40%] shadow-lg object-cover"
                />

                {/* Right Column */}
                <div className="flex flex-col gap-6">
                  {/* Doctor 2 */}
                  <img
                    // initial={{ opacity: 0, x: -50 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // transition={{ duration: 0.8, delay: 0.4 }}
                    // viewport={{ amount: 0.2 }}
                    src={dr4}
                    alt="Doctor 4"
                    className="w-[180px] h-[230px] md:w-[150px] md:h-[200px] rounded-[40%] shadow-lg object-cover"
                  />

                  {/* Watch Video Section */}
                  <div
                    // initial={{ opacity: 0, x: -50 }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // transition={{ duration: 0.8, delay: 0.6 }}
                    // viewport={{ amount: 0.2 }}
                    className="relative right-10 w-[200px] h-[120px] md:w-[160px] md:h-[100px] rounded-[40%] shadow-lg overflow-hidden"
                  >
                    <img
                      src={dr5}
                      alt="Doctor 5"
                      className="absolute  w-full h-full object-cover opacity-60"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Text Section */}
            <div
              id="about"
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              // viewport={{ amount: 0.2 }}
              className="lg:w-1/2 md:w-full px-10"
            >
              <h5 className="text-xl md:text-2xl font-bold text-[#f89c7c]  tracking-widest uppercase">
                About MedPredit
              </h5>
              <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
                Your predictive and Preventive healthcare Partner
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
            </div>
          </div>
          <section id="services" className="bg-[#FFF7F5] py-16 px-10">
            <div className="max-w-6xl mx-auto">
              {/* Section Heading */}
              <div
                // initial={{ opacity: 0, y: -50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.3 }}
                // transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center mt-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-[#f89c7c] uppercase tracking-widest">
                  How Medpredit works
                </h3>
                <h2 className="text-3xl md:text-4xl lg:text-4xl  mt-5 font-bold text-[#07332F]">
                  Simplify health tracking for your entire family with
                  MedPredit!
                </h2>
              </div>

              {/* Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {services.map((service, index) => (
                  <div
                    key={index}
                    // initial={{
                    // opacity: 0,
                    // x: -50, // All animations from left side only
                    // }}
                    // whileInView={{ opacity: 1, x: 0 }}
                    // viewport={{ once: true, amount: 0.3 }}
                    // transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative overflow-hidden group border shadow-md cursor-pointer"
                  >
                    {/* Background Hover Effect */}
                    <div className="absolute inset-0 bg-[#f7a582] origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"></div>

                    <div className="relative p-6 flex flex-col items-center transition-all duration-300 z-10">
                      <img
                        style={{ width: "25%", height: "40%" }}
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
                    {/* <a
                    // initial={{ opacity: 0, y: 30 }}
                    // whileInView={{ opacity: 1, y: 0 }}
                    // viewport={{ once: true, amount: 0.3 }}
                    // transition={{ duration: 0.2, delay: 0.1 }}
                    className="relative bg-[#F4A38A] text-white text-center py-3 font-semibold flex justify-center items-center gap-2 transition-all duration-300 z-10 group-hover:text-[#07332F]"
                  >
                    Read More <FaArrowRight />
                  </a> */}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#FFF7F3] py-16 px-6 md:px-10 lg:px-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
            {/* Left Side - Image & Stats */}
            <div
              // initial={{ opacity: 0, x: -50 }}
              // whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true, amount: 0.3 }}
              // transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full md:w-[45%] lg:w-[40%]"
            >
              <img
                src={grpdr}
                alt="Doctors"
                className="w-full rounded-lg shadow-lg"
              />

              {/* Floating Stats */}
              {/* <div
              ref={sectionRef} // Attaching ref to track visibility
              // initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              // transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
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
            </div> */}
            </div>

            {/* Right Side - FAQ */}
            <div
              // initial={{ opacity: 0, x: -50 }} // Changed from x: 50 to x: -50
              // whileInView={{ opacity: 1, x: 0 }}
              // viewport={{ once: true, amount: 0.3 }}
              // transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full md:w-[50%] lg:w-[55%]"
            >
              <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide ">
                FAQs
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#002E2C] mt-2 leading-tight">
                Curious about MedPredict? Let's clear things up together.
              </h2>

              {/* FAQ Section */}
              <div
                // initial={{ opacity: 0, y: 30 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.3 }}
                // transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="mt-8 space-y-4"
              >
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="pb-3"
                    // initial={{ opacity: 0, x: -30 }} // Changed from y: 10 to x: -30
                    // whileInView={{ opacity: 1, x: 0 }} // Changed from y: 0 to x: 0
                    // viewport={{ once: true, amount: 0.3 }}
                    // transition={{
                    // duration: 0.5,
                    // delay: index * 0.2,
                    // ease: "easeOut",
                    // }}
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
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* <section className="bg-[#023E36] py-16 px-10">
        <div className="max-w-6xl mx-auto p-10">
          <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide">
            Testimonial
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mt-2">
            What Users Say
          </h2>

          <div
            {...swipeHandlers}
            className="relative mt-10 flex items-center justify-center"
          >
         
            <button
              className="absolute -left-8 text-white  p-2 rounded-full shadow-lg z-10"
              onClick={() => handleSwipe("right")}
            >
              <GrPrevious />
            </button>

       
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-transform duration-300">
              {userReviews
                .slice(currentIndex, currentIndex + itemsPerView)
                .map((userReviews, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 shadow-lg rounded-lg text-center"
                  >
                    <div className="flex justify-center mb-4">
                      <FaUserAlt className="text-[#f49967] text-4xl" />
                    </div>

                    <h4 className="font-bold">{userReviews.userName}</h4>
                    <p className="text-gray-500">{userReviews.useremail}</p>
                    <div className="flex justify-center mt-2 text-[#f49967]">
                      {Array.from({ length: 5 }).map((_, i) =>
                        i < Number(userReviews.ratings) ? (
                          <FaStar key={i} />
                        ) : (
                          <FaRegStar key={i} />
                        )
                      )}
                    </div>

                    <p className="text-gray-700 mt-2">
                      {userReviews.reviewContent}
                    </p>
                  </div>
                ))}
            </div>

         
            <button
              className="absolute -right-8 text-white  p-2 rounded-full shadow-lg z-10"
              onClick={() => handleSwipe("left")}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex justify-center"
          onClick={() => {
            navigate("/reviews");
            window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll
          }}
        >
          <button className="mt-6 rounded-4xl border-2 border-[#f89c7c] text-[#f89c7c] px-6 py-2 shadow-lg active:bg-[#07332f] hover:bg-[#07332f] transition">
            Read More
          </button>
        </div>
      </section> */}

        <section id="pages" className="bg-[#fef6f2] mt-10 py-10 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-[#f7a582] text-xl md:text-2xl font-bold uppercase">
              upcoming Blogs
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
              Latest News & Articles.
            </h2>

            {/* Grid Layout with Scroll Animation */}
            <div
              className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10"
              onClick={() => {
                navigate("/blogs");
                window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll
              }}
            >
              {Array.isArray(blogs) &&
                blogs.map((blog, index) => (
                  <div
                    key={index}
                    // initial="hidden"
                    // whileInView="visible"
                    // viewport={{ once: true, amount: 0.3 }}
                    // variants={fadeUpVariants}
                    className="bg-[#fef6f2] p-4"
                  >
                    <img
                      src={blog.signedImageUrl || blogsimg}
                      alt={blog.blogTitle}
                      className="w-full h-48 object-cover rounded-md"
                    />

                    <h3 className="text-xl font-bold mt-5 text-gray-900">
                      {blog.blogTitle}
                    </h3>
                  </div>
                ))}
            </div>
            {/* Button */}
            <div
              className="flex justify-end"
              onClick={() => {
                navigate("/blogs");
                window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll
              }}
            >
              <button className="mt-6 rounded-4xl border-2 border-[#f89c7c] text-[#f89c7c] px-6 py-2 shadow-lg active:bg-[#07332f] hover:bg-[#07332f] transition">
                Read More
              </button>
            </div>
          </div>
        </section>

        {/* <section id="achievements" className="bg-[#023E36] py-16 px-10">
        <div className="max-w-6xl mx-auto p-10">
          <p className="text-[#F4A38A] text-xl md:text-2xl font-bold uppercase tracking-wide">
            Achievements
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mt-2">
            Our Milestones and Success Stories
          </h2>

          <div
            {...swipeHandlers}
            className="relative flex items-center justify-center mt-10"
          >
          
            <button
              className="absolute -left-8 text-white  p-2 rounded-full shadow-lg z-10"
              onClick={() => handleSwipe("right")}
            >
              <GrPrevious />
            </button>

        
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 transition-transform duration-300">
              {achievement
                .slice(currentIndex, currentIndex + itemsPerView)
                .map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 shadow-lg rounded-lg text-center"
                  >
                    <h4 className="font-bold">
                      {achievement.achievementTitle}
                    </h4>
                    <p className="text-gray-500">{achievement.achievedOn}</p>

                    <p
                      className="text-gray-700 mt-2"
                      dangerouslySetInnerHTML={{
                        __html: achievement.achievementDescription,
                      }}
                    />
                  </div>
                ))}
            </div>

          
            <button
              className="absolute -right-8 text-white  p-2 rounded-full shadow-lg z-10"
              onClick={() => handleSwipe("left")}
            >
              <GrNext />
            </button>
          </div>
        </div>
      </section> */}

        {/* <section id="versions" className="bg-[#fef6f2] mt-40 py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[#f7a582] text-xl md:text-2xl font-bold uppercase">
            Release History
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold text-[#07332f] mt-2">
            Version Sessions & Updates
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {version.map((version, index) => (
              <div
                key={index}
                // initial="hidden"
                // whileInView="visible"
                // viewport={{ once: true, amount: 0.3 }}
                variants={fadeUpVariants}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#07332f] mb-2">
                      {version.version}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Released: {formatDate(version.releaseDate)}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      version.refStatus
                    )}`}
                  >
                    {version.refStatus}
                  </span>
                </div>
              
                <div className="mb-4">
                  <h4 className="text-lg font-semibold text-[#07332f] mb-2">
                    Release Notes
                  </h4>
                  <p
                    className={`text-gray-700 text-sm leading-relaxed ${
                      expandedIndex === index ? "" : "line-clamp-2"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: version.notes,
                    }}
                  >
                  
                  </p>
                </div>

                <div
                  className="flex justify-between items-center pt-4 border-t border-gray-100"
                  // onClick={() => {
                  //   navigate("/version");
                  //   window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll
                  // }}
                  onClick={() => {
                    navigate("/version", {
                      state: { versionDetails: version },
                    });
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <div className="text-xs text-gray-500">
                    Version {version.version}
                  </div>
                  <button className="text-[#f7a582] hover:text-[#07332f] text-sm font-medium transition-colors">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

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

          <div
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }}
            // variants={slideInVariants}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#043d36] rounded-lg shadow-lg overflow-hidden"
          >
            {/* Left Side - Info & Illustration */}
            <div className="flex flex-col justify-center items-center bg-[#f7a582] text-center w-[80%]">
              <img src={formimg} alt="Appointment" className="w-50 h-50 mb-4" />
              <h2 className="text-2xl font-semibold text-white">
                Get in Touch
              </h2>
              <p className="text-white text-lg mt-2">
                Have questions? We're here to help!
              </p>
              <p className="text-white text-lg font-medium mt-2">
                Take charge of your health with{" "}
                <span className="font-bold">MedPredit!</span>
              </p>
            </div>

            <form>
              <div className="p-8">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                    />
                    <input
                      type="text"
                      placeholder="Your Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[100%] md:w-[204%] lg:w-[204%]">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
            Feedback Form
          </h2>

          <div
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.3 }}
            // variants={slideInVariants}
            className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#043d36] rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex flex-col justify-center items-center bg-[#f7a582] text-center w-[80%]">
              <img src={feedback} alt="Feedback" className="w-50 h-50 mb-4" />
              <h2 className="text-2xl font-semibold text-white">
                We Value Your Feedback
              </h2>
              <p className="text-white text-lg mt-2">
                Your opinion helps us improve our services.
              </p>
              <p className="text-white text-lg font-medium mt-2">
                Share your experience with{" "}
                <span className="font-bold">MedPredit</span>!
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFeedbackSubmit();
              }}
              className="p-8 space-y-4"
            >
              <Toast ref={toast} />

              {/* <p className="text-sm text-[#fff]">
              Login required to post your feedback. <span className="text-[#eb0404]">*</span>
            </p> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  name="userName"
                  required
                  value={feedbackData.userName}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      userName: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="useremail"
                  required
                  value={feedbackData.useremail}
                  onChange={(e) =>
                    setFeedbackData({
                      ...feedbackData,
                      useremail: e.target.value,
                    })
                  }
                  className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-[204%] lg:w-[204%]">
                <div className="flex items-center">
                  <Rating
                    value={parseInt(feedbackData.ratings) || 0}
                    required
                    onChange={(e) =>
                      setFeedbackData({
                        ...feedbackData,
                        ratings: e.value?.toString() || "0",
                      })
                    }
                    cancel={false}
                  />
                </div>
              </div>

              <textarea
                placeholder="Your Message"
                name="reviewContent"
                required
                value={feedbackData.reviewContent}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    reviewContent: e.target.value,
                  })
                }
                rows={4}
                className="w-full p-3 bg-transparent border border-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-[#f7a582]"
              ></textarea>

              <button
                className="w-[25%] p-3 bg-transparent border-2 border-[#f7a582] text-[#f7a582] rounded-full font-semibold hover:bg-white hover:text-[#f7a582] transition duration-300"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
