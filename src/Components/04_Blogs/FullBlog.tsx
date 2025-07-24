import React, {  useState } from "react";
// import { useParams } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";
import image1 from "../../assets/images/Blogs/Blog4[2].jpg";
import image2 from "../../assets/images/Blogs/Blog2[2].jpg";
// import image3 from "../../assets/images/Blogs/image3.png";
import image4 from "../../assets/images/Blogs/Blog1[4].jpg";

// import axios from "axios";
// import { decryptAPIResponse } from "../../utils";

interface BlogArray {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  refBlogId: string;
  signedImageUrl: string;
}

const FullBlog: React.FC = () => {
  // const { id } = useParams();

  const BlogContent: BlogArray = {
    blogTitle:
      "Why a Mobile Health Assistant is the Future of Family Health Assessment",
    blogContent: "",
    blogImage: "",
    refBlogId: "static-blog-001",
    signedImageUrl: blogsimg, // Use imported image, not string "blogsimg"
  };

  const [blogs, _setBlogs] = useState<BlogArray[]>([BlogContent]);

  // useEffect(() => {
  //   if (id) {
  //     axios
  //       .post(
  //         import.meta.env.VITE_API_URL + "/WebsiteRoutes/getBlogs",
  //         { blogId: id },
  //         {
  //           headers: {
  //             Authorization: localStorage.getItem("token"),
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         const data = decryptAPIResponse(
  //           response.data[1],
  //           response.data[0],
  //           import.meta.env.VITE_ENCRYPTION_KEY
  //         );

  //         if (data.status === true && Array.isArray(data.result)) {
  //           localStorage.setItem("token", "Bearer " + data.token);
  //           setBlogDetails(data.result[0]);
  //         }
  //       })
  //       .catch((e) => {
  //         console.error("Error fetching blog details:", e);
  //       });
  //   }
  // }, [id]);

  // if (!blogDetails) {
  //   return <p className="text-center mt-10 text-gray-600">Loading blog...</p>;
  // }

  return (
    <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      {/* <div className="max-w-4xl mx-auto py-10 px-4">
        <img
          src={blogDetails.signedImageUrl || blogsimg}
          alt={blogDetails.blogTitle}
          className="w-full h-full object-cover rounded-md"
        />

        <h1 className="text-3xl font-bold text-[#07332f] mt-3">
          {blogDetails.blogTitle}
        </h1>
        <div
          className="prose max-w-none mt-6 text-gray-800"
          dangerouslySetInnerHTML={{ __html: blogDetails.blogContent }}
        />
      </div> */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold text-[#07332f] mt-10 mb-10">
          {blogs[0].blogTitle}
        </h1>
        <img
          src={blogs[0].signedImageUrl}
          alt={blogs[0].blogTitle}
          className="w-full h-full object-cover rounded-md"
        />
        <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-10">
          {/* {blogs[0].blogTitle} */}
          What is a mobile health assistant?
        </h3>

        <div
          className="prose max-w-none mt-6 text-gray-800"
          // dangerouslySetInnerHTML={{ __html: blogs[0].blogContent }}
        />

        <p>
          A mobile health assistant is a human-supported or phone-enabled
          application offering health care support and services remotely via
          cell phones. It assists shoppers with health checks, medical advice
          access, test appointments, virtual consultations, and even home health
          checks — all via an app or phone call.
        </p>
        <p>
          For parents, that translates to the fact that routine health checks no
          longer mean long waiting lists at clinics, excessive forms, and school
          and work days lost.
        </p>
        <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-10">
          {/* {blogs[0].blogTitle} */}
          The Move Towards Preventive Healthcare
        </h3>

        <div
          className="prose max-w-none mt-6 text-gray-800"
          // dangerouslySetInnerHTML={{ __html: blogs[0].blogContent }}
        />

        <p>
          Those times when individuals made a doctor's appointment only when
          symptoms became unbearable are now over. Now, the attention is turning
          towards preventive care, and it is about time. Preventive care is all
          about early risk identification, treating long-term conditions before
          they soar, and overall well-being.
        </p>
        <p className="mt-3">
          A mobile health assistant like{" "}
          <strong>
            <a
              href="https://medpredit.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#07332f] transition"
            >
              MedPredit
            </a>
          </strong>{" "}
          makes preventive care easy. Rather than missing checkups because of
          time or travel issues, families can now:
        </p>

        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Schedule home visits for blood tests and vital checks.</li>
          <li>Be capable of doing teleconsults with physicians.</li>
          <li>
            Have lifestyle or stress tests depending on individual requirements.
          </li>
          <li>
            Get reminders and health monitoring tips for the whole family.
          </li>
        </ul>

        <img
          src={image1}
          alt={blogs[0].blogTitle}
          className="w-full h-full object-cover rounded-md mt-5"
        />

        <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-6">
          Advantages of a Mobile Health Assistant for Families
        </h3>

        <div className="space-y-6 text-gray-800">
          <div>
            <h4 className="font-semibold text-lg">
              1. Convenience at Your Fingertips
            </h4>
            <p>
              Mobile health solutions eliminate the need to commute or queue.
              Families can book health checks online with MedPredit and choose
              an accessible time slot. Health professionals visit your home, so
              it's easier for elderly parents, children, and busy professionals
              to take care of their health.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">
              2. Personalised Health Monitoring
            </h4>
            <p>
              Each family is different, and so are their health requirements. A
              mobile health care attendant such as MedPredit caters to the
              individual health records of all members of the family. If they
              are diabetic, if they need to monitor blood pressure, or if they
              need to monitor stress – data is organised tidily, securely, and
              readily accessible at any given time.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">
              3. Early Detection of Health Issues
            </h4>
            <p>
              With regular checkups and screening devices, mobile health
              websites can enable early diagnosis. A quick family health test
              can reveal underlying health risks like high cholesterol, vitamin
              deficiencies, or early indicators of cardiac complications –
              before they become crises.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">
              4. Preventive Care at Low Prices
            </h4>
            <p>
              The purchase of a mobile health assistant saves the cost of
              healthcare in the long term. It is accompanied by early treatment
              and frequent check-ups to avoid costly hospital procedures.
              Affordable home packages offered by MedPredit guarantee that
              families are healthy without incurring a huge bill.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg">
              5. Health Education and Empowerment
            </h4>
            <p>
              MedPredit does not only offer services – it teaches family
              members. Its platform enables users to gain valuable health tips,
              lifestyle advice, and reminders to stick to their wellness
              programmes. This develops a culture of health consciousness within
              the family.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-4">
              MedPredit: Revolutionising Family Health in India
            </h3>
            <p>
              Headquartered in India, MedPredit is at the forefront of mobile
              health evaluation services. Made for today's busy families,
              MedPredit brings healthcare home – literally. Whether you need a
              quick stress test near you, a complete body health assessment, or
              wellness services for the entire family, MedPredit provides:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Home health checkups conducted by certified professionals</li>
              <li>Electronic health records and immediate results</li>
              <li>Stress, lifestyle, and wellness evaluations</li>
              <li>
                Customised packages for women, children, elders, and working
                individuals
              </li>
              <li>
                Family-orientated services so that nobody's health is neglected
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img
            src={image2}
            // alt={blogs[0].blogTitle}
            className="w-full h-full object-cover rounded-md mt-10"
          />
        </div>
        <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-6">
          The Involvement of Technology in Transforming Family Health
        </h3>
        <div className="space-y-6 text-gray-800">
          <p>
            Smart technology drives mobile health assistants. From AI-driven
            risk identification to real-time tracking of data, the digital era
            has transformed family health check-ups into smart and swift
            processes.
          </p>
          <p>
            Apps such as MedPredit blend technology and compassion. The user
            interface is simple, the workflow is smooth, and the care is built
            on knowledge and trust.
          </p>
          <p>
            With increased remote work, homeschooling, and digital-first living,
            a mobile healthcare assistant is not an option anymore — it's a
            must-have for today's families.
          </p>

          <h3 className="text-2xl font-bold text-[#07332f] mt-10 mb-4">
            The Future is Preventive, Personalised, and Portable
          </h3>
          <p>
            Care is no longer confined to the hospital and clinic. With mobile
            health assistants, care is at your side wherever you are. Families
            do not have to choose between daily routine and health anymore.
            MedPredit solutions like:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4">
            <li>
              Mothers can keep track of the development of their children
              without stepping out of the house.
            </li>
            <li>
              Older citizens do not have to experience the travails of travel
              for routine check-ups.
            </li>
            <li>
              Working individuals may be kept abreast of their wellness
              parameters without affecting their routine.
            </li>
          </ul>
          <p>
            The future of family health screening is here, and it's wireless.
          </p>
        </div>

        <img
          src={image4}
          alt={blogs[0].blogTitle}
          className="w-full h-full object-cover rounded-md mt-10"
        />
        <h3 className="text-2xl font-bold text-[#07332f] mt-12 mb-6">
          Conclusion
        </h3>
        <div className="space-y-5 text-gray-800 leading-relaxed">
          <p>
            In a life of finite time and health that cannot be substituted, an
            on-the-go health assistant is the ideal solution. It bridges the gap
            between busy schedules and regular care. With family health
            screenings in quick reach, MedPredit is sure to have families
            healthy, well-informed, and ready – not only for today, but for
            tomorrow as well.
          </p>
          <p>
            Whether you need a checkup planned or want to find out about your
            stress levels, MedPredit brings healthcare to your doorstep with
            empathy and ease.
          </p>
          <p className="font-semibold">
            Do not wait until you have a problem. Take the initiative. Start
            your family's path towards wellness — at home, with MedPredit.
          </p>
          <p className="text-[#f89c7c] font-bold">
            Want to get in control of your family's wellbeing?
            <br />
            <a
              href="https://medpredit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-[#07332f] transition"
            >
              Go to medpredit.com and book your family's on-site health check
              today!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
