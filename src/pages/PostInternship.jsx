import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmployeeRegistrationSchema } from "../components/Schemas";
import { userContext } from "../../store";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const PostInternship = () => {
  const navigate = useNavigate();
  const dataSubmit = async (data) => {
      try {
        const fdata = new FormData();
        const fullName = `${data.firstName} ${data.lastName}`.trim();
        fdata.append("fullName", fullName);
        fdata.append("email", data.email);
        fdata.append("phoneNumber", data.phoneNumber);
        fdata.append("password", data.password);
        fdata.append("userType", "employee");
  
        const response = await UserService.signup(fdata);
        console.log(response.data, "response.data");
  
        if (response.data.success) {
          toast.success(response.data.message);
          navigate(`/otp-generator`, { state: { email: data.email } });
        } else {
          toast.error(response.data.error);
        }
      } catch (err) {
        console.error("Signup error:", err);
        toast.error("Something went wrong");
      }
    };
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(EmployeeRegistrationSchema),
      mode: "all",
    });
  return (
    <>
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 px-4 sm:px-6 lg:px-8">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              Hire Interns & Freshers{" "}
              <span className="text-blue-600 italic">faster</span>
            </h1>
            <p className="text-gray-600 mt-3 text-base sm:text-lg">
              Post Internships for <strong>Free</strong> & Hire Talent with up
              to 2 Years of Experience
            </p>
          </div>

          {/* Right Form */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md border">
            <form onSubmit={handleSubmit(dataSubmit)} className="space-y-4">
              <input
                type="email" {...register("email")}
                placeholder="Official Email Id"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
               {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
              <input
                type="password" {...register("password")}
                placeholder="Password (Min 6 characters)"
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="text" {...register("firstName")}
                  placeholder="First Name"
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                 {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
                <input
                  type="text" {...register("lastName")}
                  placeholder="Last Name"
                  className="flex-1 border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                  {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
            )}
              </div>
              <input
                type="tel"
                placeholder="Mobile Number"  {...register("phoneNumber")}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
               {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
              {/* <Link to="/employer-profile" className="block"> */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition"
                >
                  Post for Free
                </button>
              {/* </Link> */}
            </form>
            <p className="mt-3 text-sm text-center text-gray-500">
              Already registered?{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default PostInternship;
