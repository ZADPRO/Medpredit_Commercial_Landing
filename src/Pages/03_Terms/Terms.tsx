import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Terms: React.FC = () => {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);


  return (
    <div id="terms" className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-semibold text-[#0F3B36] mb-6 text-center">
          Medpredit Terms and Conditions
        </h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to Medpredit! These Terms and Conditions ("Terms") govern your use of the
            Medpredit mobile application ("App"), operated by Medpredit Technologies ("we," "our," "us").
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">1. Introduction</h2>
          <p>
            Medpredit provides healthcare-related services, including online consultations,
            appointment scheduling, prescription management, health tracking, and other services.
            By using the App, you agree to comply with these Terms.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">2. Acceptance of Terms</h2>
          <p>
            By using Medpredit, you confirm that you accept and agree to these Terms. If you do not
            agree, you should discontinue using the App immediately.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">3. Services Provided</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Online Consultations: Connect with licensed healthcare providers.</li>
            <li>Appointment Booking: Schedule appointments with healthcare professionals.</li>
            <li>Prescription Management: Manage and track your prescriptions.</li>
            <li>Health Record Management: Securely store, access, and share your medical records.</li>
            <li>Health Content and Tools: Access informative articles and monitoring tools.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">4. User Eligibility</h2>
          <p>To use Medpredit, you must be at least 18 years old or have parental consent.</p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">5. Registration and Account</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and
            ensuring the accuracy of your provided information.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">6. Use of the App</h2>
          <p>
            Users must not disrupt the service, impersonate others, or upload harmful content.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">7. Healthcare Services</h2>
          <p>
            The services provided through Medpredit do not replace in-person medical care. Always
            consult a physician for medical decisions.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">8. Privacy Policy</h2>
          <p>
            Your data is protected according to our <a href="/privacy-policy" className="text-blue-500 underline">Privacy Policy</a>.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">9. Contact Information</h2>
          <p>
  For any inquiries, contact Medpredit Technologies at:
  <br />
  <span className="font-semibold">Email:</span>{" "}
  <a href="mailto:info@zadroit.com" className="text-blue-500 underline">
    info@zadroit.com
  </a>
</p>

         
        </div>
      </div>
    </div>
  );
};

export default Terms;