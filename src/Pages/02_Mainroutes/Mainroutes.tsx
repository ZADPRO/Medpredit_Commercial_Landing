import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "../00_Header/Header";
import Footer from "../01_Footer/Footer";
import Home from "../../Components/00_Home/Home";
import Terms from "../03_Terms/Terms";
import Privacy from "../04_Privacy/Privacy";
import Login from "../05-Login/Login";
import Dashboard from "../06-Dashboard/Dashboard";
import Subscription from "../07-Subscription/Subscription";
import AdminPage from "../08-Admin/AdminPage";
import BlogPage from "../08-Admin/BlogPage";
import UserReview from "../08-Admin/UserReview";
import SignUp from "../09_SignUp/SignUp";
import Achievements from "../08-Admin/Achievements";
import NewRelease from "../08-Admin/NewRelease";
import Blogs from "../../Components/04_Blogs/Blogs";
import FullBlog from "../../Components/04_Blogs/FullBlog";
import Version from "../../Components/06-NewRelease/Version";
import Reviews from "../../Components/07-Reviews/Reviews";

// import Terms from "../03_Terms/Terms";
// import Privacy from "../04_Privacy/Privacy";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="mt-[10vh]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/blogpage" element={<BlogPage />} />
            <Route path="/user-review" element={<UserReview />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/newrelease" element={<NewRelease />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/fullblogs" element={<FullBlog />} />
            <Route path="/version" element={<Version />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
