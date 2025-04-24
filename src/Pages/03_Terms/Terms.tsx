import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Terms: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div
      id="terms"
      className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12"
    >
      <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-semibold text-[#0F3B36] mb-6 text-center">
          Medpredit Terms and Conditions
        </h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to Medpredit! These Terms and Conditions ("Terms") govern
            your use of the Medpredit mobile application ("App"), operated by
            Medpredit Technologies ("we," "our," "us").
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            1. Introduction
          </h2>
          <p>
         Our platform helps you manage your health and wellness with personalized tools and resources. By using our website and services, you agree to these Terms and Conditions. Please read them carefully to understand your rights and responsibilities.

          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            2. Acceptance of Terms
          </h2>
          <p>
          By accessing or using the MedPredict platform, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website or services.

          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            3. Services Provided
          </h2>
          <ul className="list-disc pl-5 space-y-2">
          MedPredict is a digital health management platform that offers:
            <li>
            Comprehensive Self Health Evaluation: Personalized tools to assess your overall health condition based on self-reported data.


            </li>
            <li>
            Preventive & Wellness Programs: Customized wellness advice and lifestyle tracking to help you stay ahead of potential health issues.

            </li>
            <li>
            Self-Education and Awareness: Informative content to help users understand health parameters, symptoms, and wellness routines.

            </li>
            <li>
            Evaluation History: A digital record of your past health assessments for easy access and comparison over time.

            </li>
            <li>
            Monitoring Tools for Sugar and Blood Pressure: Simple, user-friendly interfaces to record, track, and analyze blood sugar and blood pressure levels.

            </li>
            These services are designed to promote self-care and early detection. They do not replace professional medical consultation or treatment.

          </ul>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            4. User Eligibility
          </h2>
          <p>
          To use Medpredit, you must be at least 18 years old or have parental consent.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            5. Registration and Account
          </h2>
          <p>
          You are responsible for maintaining the confidentiality of your account credentials and ensuring the accuracy of your provided information.

          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            6. Use of the App
          </h2>
          <p>
          Users must not disrupt the service, impersonate others, or upload harmful content.

          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            7. Healthcare Services
          </h2>
          <p>
          The services provided through Medpredit do not replace in-person medical care. Always consult a physician for medical decisions.

          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            8. Privacy Policy
          </h2>
          <p>
          We are committed to protecting your privacy. All personal data collected through our platform is handled in accordance with our  

            <a href="/privacy-policy" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .Your data is never sold and is only used to enhance your experience with our health tools and services.
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
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            10. Refunds & Cancellations
          </h2>
          <p>
          All service purchases made through Medpredit are non-refundable, non-exchangeable, and non-transferable. If a user decides to cancel or discontinue their subscription, any unused sessions will not be refunded.
            <br />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
