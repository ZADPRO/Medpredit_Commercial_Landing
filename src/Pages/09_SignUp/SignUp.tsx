import { useState, useRef } from "react";
import decrypt from "../../helper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";

const SignUp = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [inputs, setInputs] = useState({
    refUserFname: "",
    refUserLname: "",
    refUserEmail: "",
    refUserPassword: "",
    refUserConPassword: "",
    refGender: "-",
    refMaritalStatus: "-",
    refDOB: "-",
    refEducation: "-",
    refProfession: "-",
    refSector: "-",
    refAddress: "-",
    refDistrict: "-",
    refPincode: "-",
    refUserMobileno: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    isSignIn: boolean = false
  ) => {
    const { name, value } = e.target;
    if (isSignIn) {
      // custom logic for sign-in inputs
      console.log("Handling sign-in input:", name);
    }

    if (name === "refUserMobileno") {
      // Allow only digits and limit to 10 characters
      const numericValue = value.replace(/\D/g, ""); // remove non-digits
      if (numericValue.length > 10) return; // prevent more than 10 digits

      setInputs((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setErrorMessage("");
  };

  const handleSignup = async () => {
    // Check if passwords match before sending request
    if (inputs.refUserPassword !== inputs.refUserConPassword) {
      setErrorMessage("Make sure both passwords are the same");
      return;
    }

    setLoading(true);
    setErrorMessage(""); // Clear previous errors

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/commercial/usersignup",
        {
          refUserFname: inputs.refUserFname,
          refUserLname: inputs.refUserLname,
          refUserEmail: inputs.refUserEmail,
          refUserPassword: inputs.refUserPassword,
          refUserConPassword: inputs.refUserConPassword,
          refDOB: inputs.refDOB,
          refMaritalStatus: inputs.refMaritalStatus,
          refEducation: inputs.refEducation,
          refProfession: inputs.refProfession,
          refSector: inputs.refSector,
          refAddress: inputs.refAddress,
          refDistrict: inputs.refDistrict,
          refPincode: inputs.refPincode,
          refUserMobileno: inputs.refUserMobileno,
          refGender: inputs.refGender,
        }
      );

      const data = decrypt(
        response.data[1],
        response.data[0],
        import.meta.env.VITE_ENCRYPTION_KEY
      );

      console.log(data);

      if (data.status === true) {
        setLoading(false);
        toast.current?.show({
          severity: "success",
          summary: "Success",
          detail: " Added successfully!",
          life: 3000,
        });

        setInputs({
          refUserFname: "",
          refUserLname: "",
          refUserEmail: "",
          refUserPassword: "",
          refUserConPassword: "",
          refGender: "-",
          refMaritalStatus: "-",
          refDOB: null as any,
          refEducation: "",
          refProfession: "",
          refSector: "",
          refAddress: "",
          refDistrict: "",
          refPincode: null as any,
          refUserMobileno: "",
        });
        navigate("/login");
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Success",
          detail: " Already registered!",
          life: 3000,
        });
      }
    } catch {
      setLoading(false);
      console.error("Signup failed");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="w-[100%] flex justify-around items-center py-10">
      <div className="w-[90%] lg:w-[40%] border mt-15 shadow-md rounded flex justify-center items-center flex-col">
        <Toast ref={toast} />
        <form
          className="w-[100%] flex justify-center  items-center flex-col"
          onSubmit={(e: any) => {
            e.preventDefault();
            handleSignup();
          }}
        >
          <h1 className="text-[#333] font-bold text-[2rem] py-4">Sign Up</h1>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserFname"
              type="text"
              name="refUserFname"
              placeholder="Your First Name"
              required
              value={inputs.refUserFname}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="refUserFname"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your First Name
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserLname"
              type="text"
              name="refUserLname"
              placeholder="Your Last Name"
              required
              value={inputs.refUserLname}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="refUserLname"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Last Name
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserEmail"
              type="text"
              name="refUserEmail"
              placeholder="Your Email ID"
              required
              value={inputs.refUserEmail}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="refUserEmail"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Email ID
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserMobileno"
              type="text"
              name="refUserMobileno"
              placeholder="Your Mobile Number"
              required
              value={inputs.refUserMobileno}
              maxLength={10}
              pattern="[0-9]{10}"
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />

            <label
              htmlFor="refUserMobileno"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Mobile Number
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserPassword"
              type="password"
              name="refUserPassword"
              placeholder="Your Password"
              required
              value={inputs.refUserPassword}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="refUserPassword"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Password
            </label>
          </div>
          <div className="relative my-3 w-[70%]">
            <input
              id="refUserConPassword"
              type="password"
              name="refUserConPassword"
              placeholder="Your Confirm Password"
              required
              value={inputs.refUserConPassword}
              className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-[#0f3b36] focus:outline-none  focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              onChange={(e) => handleInputChange(e, true)}
            />
            <label
              htmlFor="refUserConPassword"
              className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-[#0f3b36] peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
            >
              Your Confirm Password
            </label>
          </div>
          {errorMessage && (
            <div className="pt-3 text-[red]">{errorMessage}</div>
          )}{" "}
          <div>
            <div className="flex justify-between items-center w-[100%] text-sm text-slate-500 ">
              Already have an account?{" "}
              <span
                className="text-[#0f3b36] cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign In
              </span>
            </div>
          </div>
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

export default SignUp;
