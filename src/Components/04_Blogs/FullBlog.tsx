import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogsimg from "../../assets/images/Blogs/Blog3[1].jpg";
import axios from "axios";
import { decryptAPIResponse } from "../../utils";

const FullBlog: React.FC = () => {
  const { slug } = useParams(); // Changed from 'id' to 'slug'
  const navigate = useNavigate();
  const [blogDetails, setBlogDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    // Get blog ID from sessionStorage using slug
    const blogId = sessionStorage.getItem(`blog-${slug}`);
    
    if (!blogId) {
      console.error("Blog ID not found for slug:", slug);
      setLoading(false);
      return;
    }

    axios
      .post(
        import.meta.env.VITE_API_URL + "/WebsiteRoutes/getBlogs",
        { blogId: blogId },
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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, [slug]);

  // Debug: Log the HTML content to check list types
  useEffect(() => {
    if (blogDetails?.blogContent) {
      console.log("=== BLOG DEBUG INFO ===");
      console.log("Blog HTML Content:", blogDetails.blogContent);
      
      // Check if it contains <ul> or <ol>
      const hasUL = blogDetails.blogContent.includes('<ul');
      const hasOL = blogDetails.blogContent.includes('<ol');
      console.log("Contains <ul> (bullets):", hasUL);
      console.log("Contains <ol> (numbers):", hasOL);
      
      // Check for Quill classes
      const hasQuillList = blogDetails.blogContent.includes('ql-list');
      console.log("Contains Quill list class:", hasQuillList);
      console.log("======================");
    }
  }, [blogDetails]);

  // Process content to fix list types
  // Since editor saves everything as <ol>, we need to check the actual list structure
  const processContent = (html: string) => {
    if (!html) return '';
    
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Find all <ol> elements
    const orderedLists = tempDiv.querySelectorAll('ol');
    
    orderedLists.forEach((ol) => {
      // Check if this should be a bullet list
      // If the list doesn't have explicit decimal markers in the HTML attributes,
      // or if it's the default style, convert to <ul>
      const hasDecimalStyle = ol.style.listStyleType === 'decimal';
      const hasTypeAttr = ol.getAttribute('type');
      
      // If no explicit decimal styling, assume it should be bullets
      if (!hasDecimalStyle && !hasTypeAttr) {
        const ul = document.createElement('ul');
        ul.innerHTML = ol.innerHTML;
        
        // Copy any classes or styles
        Array.from(ol.attributes).forEach(attr => {
          if (attr.name !== 'style') {
            ul.setAttribute(attr.name, attr.value);
          }
        });
        
        ol.replaceWith(ul);
      }
    });
    
    return tempDiv.innerHTML;
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading blog...</p>;
  }

  if (!blogDetails) {
    return (
      <div className="bg-[#fff7f3] min-h-screen py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-[#07332f] mb-4">Blog Not Found</h2>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blogs')}
            className="bg-[#07332f] text-white px-6 py-2 rounded hover:bg-[#0a5c9c] transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fff7f3] text-[#0F3B36] min-h-screen py-12 px-6 md:px-12">
      {/* Add inline styles for blog content */}
      <style>{`
        /* Reset any conflicting styles */
        .blog-content-display * {
          box-sizing: border-box;
        }
        
        /* Blog Content Styles */
        .blog-content-display h1 {
          font-size: 2em;
          font-weight: bold;
          margin: 0.67em 0;
          line-height: 1.2;
          color: #07332f;
        }
        
        .blog-content-display h2 {
          font-size: 1.5em;
          font-weight: bold;
          margin: 0.75em 0;
          line-height: 1.3;
          color: #07332f;
        }
        
        .blog-content-display h3 {
          font-size: 1.17em;
          font-weight: bold;
          margin: 0.83em 0;
          line-height: 1.4;
          color: #07332f;
        }
        
        .blog-content-display h4 {
          font-size: 1em;
          font-weight: bold;
          margin: 1em 0;
          color: #07332f;
        }
        
        .blog-content-display h5 {
          font-size: 0.83em;
          font-weight: bold;
          margin: 1.17em 0;
          color: #07332f;
        }
        
        .blog-content-display h6 {
          font-size: 0.67em;
          font-weight: bold;
          margin: 1.33em 0;
          color: #07332f;
        }
        
        .blog-content-display p {
          margin: 1em 0;
          line-height: 1.6;
          color: #1a1a1a;
        }
        
        /* ULTRA CRITICAL: Bullet lists - Nuclear option */
        .blog-content-display ul,
        .blog-content-display ul[data-checked="false"],
        .blog-content-display .ql-editor ul {
          list-style: disc !important;
          list-style-type: disc !important;
          list-style-position: outside !important;
          margin: 1em 0 !important;
          padding-left: 2.5em !important;
          padding-inline-start: 2.5em !important;
          line-height: 1.6;
          display: block !important;
        }
        
        /* Numbered lists */
        .blog-content-display ol,
        .blog-content-display .ql-editor ol {
          list-style: decimal !important;
          list-style-type: decimal !important;
          list-style-position: outside !important;
          margin: 1em 0 !important;
          padding-left: 2.5em !important;
          padding-inline-start: 2.5em !important;
          line-height: 1.6;
          display: block !important;
        }
        
        /* Nested bullet lists */
        .blog-content-display ul ul {
          list-style-type: circle !important;
          margin: 0.5em 0 !important;
        }
        
        .blog-content-display ul ul ul {
          list-style-type: square !important;
        }
        
        /* Nested numbered lists */
        .blog-content-display ol ol {
          list-style-type: lower-alpha !important;
          margin: 0.5em 0 !important;
        }
        
        .blog-content-display ol ol ol {
          list-style-type: lower-roman !important;
        }
        
        /* List items - NUCLEAR CRITICAL */
        .blog-content-display li,
        .blog-content-display ul li,
        .blog-content-display ol li {
          margin: 0.5em 0 !important;
          display: list-item !important;
          color: #1a1a1a;
          list-style: inherit !important;
        }
        
        /* Force bullets for ul > li with maximum specificity */
        .blog-content-display ul > li,
        .blog-content-display ul[data-checked="false"] > li {
          list-style: disc !important;
          list-style-type: disc !important;
        }
        
        /* Force numbers for ol > li */
        .blog-content-display ol > li {
          list-style: decimal !important;
          list-style-type: decimal !important;
        }
        
        /* Quill editor specific classes - override everything */
        .blog-content-display .ql-editor ul,
        .blog-content-display div[class*="ql"] ul {
          list-style-type: disc !important;
        }
        
        .blog-content-display .ql-editor ol,
        .blog-content-display div[class*="ql"] ol {
          list-style-type: decimal !important;
        }
        
        .blog-content-display .ql-editor li,
        .blog-content-display div[class*="ql"] li {
          list-style: inherit !important;
        }
        
        /* Override Tailwind resets if present */
        .blog-content-display ul[class],
        .blog-content-display ol[class] {
          list-style: revert !important;
        }
        
        /* Links */
        .blog-content-display a {
          color: #f89c7c;
          text-decoration: underline;
          transition: color 0.2s ease;
        }
        
        .blog-content-display a:hover {
          color: #07332f;
        }
        
        /* Text formatting */
        .blog-content-display strong,
        .blog-content-display b {
          font-weight: bold;
        }
        
        .blog-content-display em,
        .blog-content-display i {
          font-style: italic;
        }
        
        .blog-content-display u {
          text-decoration: underline;
        }
        
        .blog-content-display s,
        .blog-content-display strike {
          text-decoration: line-through;
        }
        
        .blog-content-display blockquote {
          border-left: 4px solid #f89c7c;
          padding-left: 1em;
          margin: 1em 0;
          color: #666;
          font-style: italic;
        }
        
        .blog-content-display img {
          max-width: 100%;
          height: auto;
          margin: 1em 0;
          border-radius: 8px;
        }
        
        /* Text alignment */
        .blog-content-display .ql-align-center {
          text-align: center;
        }
        
        .blog-content-display .ql-align-right {
          text-align: right;
        }
        
        .blog-content-display .ql-align-justify {
          text-align: justify;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
          .blog-content-display h1 {
            font-size: 1.75em;
          }
          
          .blog-content-display h2 {
            font-size: 1.5em;
          }
          
          .blog-content-display h3 {
            font-size: 1.25em;
          }
          
          .blog-content-display ul,
          .blog-content-display ol {
            padding-left: 1.5em !important;
          }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto py-10 px-4">
        <img
          src={blogDetails.signedImageUrl || blogsimg}
          alt={blogDetails.blogTitle}
          className="w-full h-full object-cover rounded-md"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-[#07332f] mt-6 mb-4">
          {blogDetails.blogTitle}
        </h1>
        
        {/* Changed class name and use processContent */}
        <div
          className="blog-content-display mt-6"
          dangerouslySetInnerHTML={{ __html: processContent(blogDetails.blogContent) }}
        />
      </div>
    </div>
  );
};

export default FullBlog;