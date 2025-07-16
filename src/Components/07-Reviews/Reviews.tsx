import React from "react";
import { useEffect, useState } from "react";
import { decryptAPIResponse } from "../../utils";
import axios from "axios";
import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// interface BlogArray {
//   blogTitle: string;
//   blogContent: string;
//   blogImage: string;
//   blogId: string;
//   signedImageUrl: string;
// }

const Reviews: React.FC = () => {
  const [userReviews, setUserReviews] = useState<any[]>([]);
  // const navigate = useNavigate();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  // const slideInVariants = {
  //   hidden: { opacity: 0, x: -100 },
  //   visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  // };

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
  useEffect(() => {
    fetchUserReview();
  }, []);

  // const ReadMore = async (id: string) => {
  //   console.log("id-------------->", id);
  //   try {
  //     const response = await axios.post(
  //       import.meta.env.VITE_API_URL + "/WebsiteRoutes/getBlogs",
  //       { blogId: id },
  //       {
  //         headers: {
  //           Authorization: localStorage.getItem("token"),
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = decryptAPIResponse(
  //       response.data[1],
  //       response.data[0],
  //       import.meta.env.VITE_ENCRYPTION_KEY
  //     );

  //     console.log("before details ----->", data);

  //     if (data.status === true && Array.isArray(data.result)) {
  //       localStorage.setItem("token", "Bearer " + data.token);

  //       const fullBlog = data.result; // ✅ extract first blog from array
  //       console.log("full details ----->", fullBlog);
  //     } else {
  //       console.error("API update failed or unexpected format:", data);
  //     }
  //   } catch (e) {
  //     console.error("Error updating package:", e);
  //   }
  // };

  return (
    <div
      id="pages"
      className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12"
    >
      <section id="pages" className="bg-[#fef6f2]  py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-[#f7a582] text-xl md:text-2xl font-bold uppercase">
            Testimonial
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
            What Users Say
          </h2>

          {/* Grid Layout with Scroll Animation */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
            {Array.isArray(userReviews) &&
              userReviews.map((review, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUpVariants}
                  className="bg-white rounded-xl shadow-md p-6 border border-[#fcd5ce]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-[#f7a582] w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                      {review.userName?.charAt(0)}
                    </div>
                    <h3 className="text-lg font-semibold text-[#07332f]">
                      {review.userName}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-700 italic mb-3">
                    {review.reviewContent}
                  </p>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(parseInt(review.ratings)).keys()].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ★
                      </span>
                    ))}
                    {[...Array(5 - parseInt(review.ratings)).keys()].map(
                      (_, i) => (
                        <span key={i} className="text-gray-300 text-lg">
                          ★
                        </span>
                      )
                    )}
                  </div>

                  <p className="text-xs text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
