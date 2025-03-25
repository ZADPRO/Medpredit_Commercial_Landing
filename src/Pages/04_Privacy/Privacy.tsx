import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-bold text-[#0F3B36] mb-6">Medpredit Privacy Policy</h1>

        <p className="text-lg leading-relaxed">
          Medpredit Technologies ("Medpredit," "we," "our," or "us") is committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you use the Medpredit mobile application ("App") and its associated services. By using the App, you consent to the collection and use of your personal data as described in this Privacy Policy.
        </p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">1. Information We Collect</h2>
        
        <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">A. Personal Information:</h3>
        <p className="text-lg leading-relaxed">Account Information: When you register for the App, we collect your name, email address, phone number, and other contact details.</p>

        <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">B. Health Information:</h3>
        <p className="text-lg leading-relaxed">Health Records: We may collect data related to symptoms, diagnoses, and medical consultations.</p>

        <h3 className="text-xl font-semibold text-[#0F3B36] mt-4">C. Usage Data:</h3>
        <p className="text-lg leading-relaxed">App Activity: We collect information about how you interact with the App, including your IP address and device details.</p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">2. How We Use Your Information</h2>
        <p className="text-lg leading-relaxed">We use the collected information to provide healthcare services, improve our platform, communicate with users, and comply with legal obligations.</p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">3. Sharing of Your Information</h2>
        <p className="text-lg leading-relaxed">Your data is shared with healthcare providers, service partners, and legal authorities where necessary.</p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">4. Data Retention & Security</h2>
        <p className="text-lg leading-relaxed">We retain your data only as long as necessary and employ security measures to protect your personal information.</p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">5. Your Rights and Choices</h2>
        <p className="text-lg leading-relaxed">You have the right to access, update, delete, or opt out of data collection. Contact us at [Your Contact Information].</p>

        <h2 className="text-2xl font-semibold text-[#0F3B36] mt-6">6. Changes to This Policy</h2>
        <p className="text-lg leading-relaxed">We may update this Privacy Policy periodically. The latest version will always be available on our platform.</p>
      </div>
    </div>
  );
};

export default Terms;
