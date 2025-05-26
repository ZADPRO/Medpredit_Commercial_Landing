import React from "react";

const Privacy: React.FC = () => {
  return (
    <div id="privacy" className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      <div id="home" className="max-w-4xl mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-bold text-[#0F3B36] mb-6">Privacy Policy</h1>
        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">1. Introduction</h3>
        <p className="text-lg leading-relaxed text-justify">
          Welcome to Medpredit ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and protect your personal and health-related information when you use our self-assessment health app ("App").<br />
          By using the App, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the App
        </p>
        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">2. Information We Collect</h3>

        <h2 className="text-xl font-semibold text-[#0F3B36] mt-4">A. Personal Information</h2>
        <ul className="list-disc pl-7 space-y-2 mt-1">
          <li>
            Name
          </li>
          <li>
            Email address
          </li>
          <li>
            Contact details
          </li>
          <li>
            Date of Birth
          </li>
          <li>
            Marital Status
          </li>
          <li>
            Occupation
          </li>
          <li>
            Career details
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-[#0F3B36] mt-4">B. Health-Related Information</h2>
        <ul className="list-disc pl-7 space-y-2 mt-1">
          <li>Self-reported symptoms</li>
          <li>Physical and mental health data</li>
          <li>Lifestyle-related data (e.g., physical activity, tobacco use, stress, sleep, BMI, diet)</li>
          <li>Family medical history</li>
        </ul>

        <h2 className="text-xl font-semibold text-[#0F3B36] mt-4">C.  Device & Usage Data</h2>
        <ul className="list-disc pl-7 space-y-2 mt-1">
          <li>Mobile number (if registered)</li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">3. How We Use Your Information</h3>
        <ul className="list-disc pl-7 space-y-2 mt-1">
          <li>To deliver personalized health insights and self-assessments</li>
          <li>To store and analyze your responses to health questionnaires</li>
        </ul>

        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">4. Data Sharing & Disclosure</h3>
        <p className="text-lg leading-relaxed">We do not sell your personal or health data. We may share information only under the following circumstances:</p>
        <ul className="list-disc pl-7 space-y-2 my-2">
          <li>With healthcare providers, only with your explicit consent, to provide health-related services and support.</li>
          <li>With legal authorities, if required by law.</li>
        </ul>
        <p className="text-lg leading-relaxed">Your data is handled with strict confidentiality.</p>

        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">5. Data Security</h3>
        <p className="text-lg leading-relaxed">We implement industry-standard security measures to protect your data, including:</p>
        <ul className="list-disc pl-7 space-y-2 my-2">
          <li>SSL-secured communication</li>
          <li>256-bit encryption protocols</li>
          <li>Strict access controls and cryptographic key protection</li>
        </ul>
        <p className="text-lg leading-relaxed">However, no system is completely secure. Please use the App responsibly.</p>

        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">6. Your Rights</h3>
        <ul className="list-disc pl-7 space-y-2 my-2">
          <li>
            Access or update your personal information
          </li>
          <li>Delete your account</li>
          <li>Request a copy of your data</li>
        </ul>
        <p className="text-lg leading-relaxed">To exercise these rights, please contact us at <a
          href="mailto:med-info@zadroit.com"
          className="text-blue-500 underline"
        >
          med-info@zadroit.com
        </a>.</p>
        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">7. Third-Party Payment Services</h3>
        <p className="text-lg leading-relaxed">The app may contain links to third-party services used specifically for processing payments. Please note that we are not responsible for the privacy practices or policies of these external services.</p>
        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">8. Changes to This Policy</h3>
        <p className="text-lg leading-relaxed">We may update this Privacy Policy periodically. The latest version will always be available on our platform. Significant changes will be communicated to you.</p>
        <h3 className="text-2xl font-semibold text-[#0F3B36] mt-6">9. Contact Us</h3>
        <p className="text-lg leading-relaxed">For questions or concerns, contact:</p>
        <p>Zadroit IT Solutions</p>
        <p>Email: <a
          href="mailto:med-info@zadroit.com"
          className="text-blue-500 underline"
        >
          med-info@zadroit.com
        </a></p>
      </div>

    </div>
  );
};

export default Privacy;
