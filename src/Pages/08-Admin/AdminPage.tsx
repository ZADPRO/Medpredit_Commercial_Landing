import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Card } from "primereact/card";
import BlogPage from "./BlogPage";
import { RiBloggerFill } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import UserReview from "./UserReview";
import { GrAchievement } from "react-icons/gr";
import Achievements from "./Achievements";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import NewRelease from "./NewRelease";

const AdminPage: React.FC = () => {
  const [visibleSidebar, setVisibleSidebar] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#fff] mt-10 p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold text-center mt-20 mb-6">Admin Dashboard</h1>

      {/* Responsive Cards */}
      <div className="flex flex-col md:flex-row gap-4 w-full justify-evenly items-center">
        {/* Blog Card */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card
            className="cursor-pointer text-[#07332f] shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setVisibleSidebar("blog")}
          >
            <div className="w-full flex gap-5 justify-between items-center p-4">
              <p className="text-3xl flex items-center">
                <RiBloggerFill />
              </p>
              <p className="text-[#07332f] font-bold">Manage Blogs</p>
              <FaArrowRight className="text-lg" />
            </div>
          </Card>
        </div>

        {/* Review Card */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card
            className="cursor-pointer text-[#07332f] shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setVisibleSidebar("user")}
          >
            <div className="w-full flex gap-5 justify-between items-center p-4">
              <p className="text-3xl flex items-center">
                <MdOutlineRateReview />
              </p>
              <p className="text-[#07332f] font-bold">User Review</p>
              <FaArrowRight className="text-lg" />
            </div>
          </Card>
        </div>

        {/* Achievements  card*/}

        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card
            className="cursor-pointer text-[#07332f] shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setVisibleSidebar("achievements")}
          >
            <div className="w-full flex gap-5 justify-between items-center p-4">
              <p className="text-3xl flex items-center">
                <GrAchievement />
              </p>
              <p className="text-[#07332f] font-bold">Achievements</p>
              <FaArrowRight className="text-lg" />
            </div>
          </Card>
        </div>



          {/* NewRelease Card */}
        <div className="w-full md:w-1/2 lg:w-1/3">
          <Card
            className="cursor-pointer text-[#07332f] shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => setVisibleSidebar("newrelease")}
          >
            <div className="w-full flex gap-5 justify-between items-center p-4">
              <p className="text-3xl flex items-center">
              <MdOutlineTipsAndUpdates />
              </p>
              <p className="text-[#07332f] font-bold">New Release</p>
              <FaArrowRight className="text-lg" />
            </div>
          </Card>
        </div>
      </div>

      {/* Blog Sidebar */}
      <Sidebar
        className="bg-white"
        visible={visibleSidebar === "blog"}
        onHide={() => setVisibleSidebar(null)}
        position="right"
        style={{
          width: window.innerWidth > 768 ? "80vw" : "100vw",
        }}
      >
        <BlogPage />
      </Sidebar>

      {/* User Review Sidebar */}
      <Sidebar
        className="bg-white"
        visible={visibleSidebar === "user"}
        onHide={() => setVisibleSidebar(null)}
        position="right"
        style={{
          width: window.innerWidth > 768 ? "80vw" : "100vw",
        }}
      >
        <UserReview />
      </Sidebar>

      {/* Achievements Sidebar */}
      <Sidebar
        className="bg-white"
        visible={visibleSidebar === "achievements"}
        onHide={() => setVisibleSidebar(null)}
        position="right"
        style={{
          width: window.innerWidth > 768 ? "80vw" : "100vw",
        }}
      >
        <Achievements />
      </Sidebar>

      {/* New Release Sidebar */}
      <Sidebar
        className="bg-white"
        visible={visibleSidebar === "newrelease"}
        onHide={() => setVisibleSidebar(null)}
        position="right"
        style={{
          width: window.innerWidth > 768 ? "80vw" : "100vw",
        }}
      >
        <NewRelease />
      </Sidebar>

    </div>
  );
};

export default AdminPage;
