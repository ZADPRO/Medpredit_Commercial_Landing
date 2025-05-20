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
          Terms and conditions
        </h1>
        <div className="space-y-6 text-lg leading-relaxed">
          <p className="text-justify">
            Welcome to MedPredit, a digital health and wellness platform that provides personalized assessments based on categories such as Stress, Alcohol, Tobacco, Dietary, BMI, Physical Activity, and Family History. By accessing or using the MedPredit application or website, you agree to the following Terms and Conditions. Please read them carefully.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            1. Acceptance of Terms
          </h2>
          <p>
            By using MedPredit, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms that may apply. If you do not agree, you must not use our services.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            2. Services Provided
          </h2>
          <p>
            MedPredit offers health-related assessments. Users can select categories and complete assessments to receive personalized insights and wellness scores.
            <br /><b>Please note:</b> MedPredit does not provide medical advice, diagnosis, or treatment. The insights and scores generated are for informational and educational purposes only and are not a substitute for professional medical advice.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            3. Registration and Account
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and ensuring the accuracy of your provided information.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            4. Subscription and Payments
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              First 2 assessments are provided for free; others require a paid subscription.
            </li>
            <li>
              Subscription details, pricing, and renewal terms will be clearly provided before purchase.
            </li>
            <li>
              Payments are processed securely via third-party payment gateways.
            </li>
            <li>
              By subscribing, you authorize us to charge your selected payment method as per your chosen plan.
            </li>
            <li>
              Subscriptions are non-refundable unless otherwise required by law.
            </li>
          </ul>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            5. Privacy and Data
          </h2>
          <p>
            We are committed to protecting your privacy. Please refer to our Privacy Policy for details on how we collect, use, and protect your data.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            6. User Conduct
          </h2>
          <p>
            You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Misuse the services or interfere with their functionality.</li>
            <li>Attempt to access or collect data from other users.</li>
            <li>Use the platform to transmit harmful, offensive, or illegal content.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            7. Disclaimers
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>MedPredit is not a medical service provider. The app is intended for informational use only.</li>
            <li>We do not guarantee the accuracy or completeness of the insights or scores.</li>
            <li>We are not liable for any decisions or actions you take based on the information provided through the app.</li>
          </ul>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            8. Intellectual Property
          </h2>
          <p>
            All content, trademarks, logos, and data on MedPredit are the property of MedPredit or its licensors. You may not reproduce, distribute, or exploit any part of the platform without prior written consent.
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            9. Contact Us
          </h2>
          <p>
            If you have any questions or concerns regarding these Terms, please contact us at:
            <br />
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:med-info@zadroit.com"
              className="text-blue-500 underline"
            >
              med-info@zadroit.com
            </a>
          </p>
          <h2 className="text-2xl font-semibold text-[#0F3B36]">
            10. Refund Policy
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <b>No Refunds:</b> We do not offer refunds or credits for any partial usage, unused time, or uncompleted assessments, regardless of the reason.
            </li>
            <li>
              <b>Non-transferable:</b> Subscriptions and purchases are linked to your account and are non-transferable.
            </li>
            <li>
              <b>Cancellation:</b> Once a subscription is purchased, it cannot be cancelled, and no refunds will be issued for any reason.
            </li>
          </ul>
        </div>
      </div>
    </div >
  );
};

export default Terms;
