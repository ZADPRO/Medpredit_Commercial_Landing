import { useState } from "react";
import decrypt from "../../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSignIn: boolean = false
  ) => {
    setErrorMessage("");
    const { name, value } = e.target;
    if (isSignIn) {
      if ((name == "username" && value.length <= 10) || name == "password") {
        setInputs((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleLogIn = () => {
    setLoading(true);
    setErrorMessage("");

    axios
      .post(import.meta.env.VITE_API_URL + "/WebsiteRoutes/adminSignin", inputs)
      .then((response) => {
        const data = decrypt(
          response.data[1],
          response.data[0],
          import.meta.env.VITE_ENCRYPTION_KEY
        );

        console.log("Login Data:", data);
        console.log("data.roleId", data.roleId);

        if (data.success || data.status) {
          if (data.roleId === 6 && data.userdetails) {
            // ADMIN user
            const adminDetails = {
              roleType: data.roleId,
              token: "Bearer " + data.token,
              userId: data.userdetails.userId,
              userCustId: data.userdetails.userCustId,
              firstName: data.userdetails.firstName,
              lastName: data.userdetails.lastName,
              phNumber: data.userdetails.phNumber,
            };

            localStorage.setItem("userDetails", JSON.stringify(adminDetails));
            localStorage.setItem("token", "Bearer " + data.token);
            navigate("/admindashboard");
          } else if (data.roleType === 3 && data.users?.length > 0) {
            // NORMAL USER
            const user = data.users[0];
            const userDetails = {
              token: "Bearer " + data.token,
              userId: user.refUserId,
              userCustId: user.refUserCustId,
              firstName: user.refUserFname,
              lastName: user.refUserLname,
              phNumber: user.refUserMobileno,
            };

            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("detailsFlag", data.isDetails);
            localStorage.setItem("firstLogin", data.isDetails);
            localStorage.setItem("tutorial", "present");
            localStorage.setItem("headStatus", user.headStatus);
            localStorage.setItem("adsBannerClosed", "present");

            navigate("/dashboard");
          } else {
            setErrorMessage("Invalid role or missing data");
          }
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        if (error.response && error.response.data) {
          setErrorMessage(error.response.data.message || "Login failed");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="w-[100%] flex justify-around items-center py-10 m">
      <div className="w-[90%] lg:w-[40%] border mt-20 shadow-md rounded flex justify-center items-center flex-col">
        <form
          className="w-[100%] flex justify-center items-center flex-col"
          onSubmit={(e: any) => {
            e.preventDefault();
            handleLogIn();
          }}
        >
          <h1 className="text-[#333] font-bold text-[2rem] py-4">Sign In</h1>
          <div className="relative my-3 w-[70%]">
            <input
              id="username"
              type="number"
              name="username"
              placeholder="Your Mobile Number"
              required
              value={inputs.username}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="username"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Mobile Number
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Your Password"
              required
              value={inputs.password}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="password"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Password
            </label>
          </div>
          <div>
            {/* <div className="flex justify-between items-center w-[100%] text-sm text-slate-500 ">
              Dont't have an account?{" "}
              <span
                className="text-[#0f3b36] cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div> */}
          </div>
          {errorMessage && (
            <div className="pt-3 text-[red]">{errorMessage}</div>
          )}{" "}
          <button
            type={loading ? "button" : "submit"}
            className="inline-flex my-5 items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-[#07332f] hover:bg-[#07332f] focus:bg-[#07332f] focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none cursor-pointer"
          >
            <span>{loading ? "Loading" : "Submit"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
