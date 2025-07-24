import React from "react";
import { useEffect, useState } from "react";
// import { decryptAPIResponse } from "../../utils";
// import axios from "axios";
// import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";

interface BlogArray {
  blogTitle: string;
  blogContent: string;
  blogImage: string;
  blogId: string;
  signedImageUrl: string;
}

const Blogs: React.FC = () => {
  const BlogContent: BlogArray = {
    blogTitle:
      "Why a Mobile Health Assistant is the Future of Family Health Assessment",
    blogContent: "",
    blogImage: "",
    blogId: "static-blog-001",
    signedImageUrl: blogsimg, // Use imported image, not string "blogsimg"
  };
  const [blogs, _setBlogs] = useState<BlogArray[]>([BlogContent]);
  const navigate = useNavigate();

  // const fadeUpVariants = {
  //   hidden: { opacity: 0, y: 50 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  // };

  // const slideInVariants = {
  //   hidden: { opacity: 0, x: -100 },
  //   visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
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
  //         setBlogs(data.forUserAllBlogs);
  //       }
  //     })
  //     .catch((e: any) => {
  //       console.log("Error fetching Blogs:", e);
  //     });
  // };

  useEffect(() => {
    // fetchBlogs();
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

  //       const fullBlog = data.result[0]; // ✅ extract first blog from array
  //       console.log("full details ----->", fullBlog);

  //       // ✅ Navigate to fullblogs with blog data
  //       // navigate("/fullblogs", { state: { blogDetails: fullBlog } });

  //       navigate(`/fullblogs/${id}`);
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
            upcoming Blogs
          </h3>
          <h2 className="text-3xl md:text-4xl lg:text-4xl  font-bold text-[#07332f] mt-2">
            Latest News & Articles.
          </h2>

          {/* Grid Layout with Scroll Animation */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-10">
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
                  <div className="flex justify-end">
                    {" "}
                    <button
                      // onClick={() => ReadMore(blog.blogId)}
                      onClick={() => {
                        navigate("/fullblogs");
                        window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Smooth scroll
                      }}
                      className="mt-6 rounded-4xl border-2 border-[#f89c7c] text-[#f89c7c] px-6 py-2 shadow-lg active:bg-[#07332f] hover:bg-[#07332f] transition"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
