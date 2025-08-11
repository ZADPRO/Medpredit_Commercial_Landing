import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";
import axios from "axios";
import { decryptAPIResponse } from "../../utils";

const FullBlog: React.FC = () => {
  const { id } = useParams();
  const [blogDetails, setBlogDetails] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/getBlogs",
        { blogId: id },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const data = decryptAPIResponse(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        if (data.status === true && Array.isArray(data.result)) {
          setBlogDetails(data.result[0]);
        }
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blogDetails) {
    return <p className="text-center mt-10 text-gray-600">Loading blog...</p>;
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
