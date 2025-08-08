import React from "react";
import { useLocation } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";

const FullBlog: React.FC = () => {
  const location = useLocation();
  const blogDetails = location.state?.blogDetails;

  if (!blogDetails) {
    return (
      <p className="text-center mt-10 text-gray-600">No blog data available.</p>
    );
  }
  return (
    <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto py-10 px-4">
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
      </div>
    </div>
  );
};

export default FullBlog;