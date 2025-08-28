import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegistrationSchema } from "./Schemas";
import { userContext } from "../../store";
import UserService from "../services/user.service";
import { useNavigate } from "react-router-dom";

import { Mail, Lock, Eye, EyeOff } from "lucide-react";

import {
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";

const GoogleSignUpButton = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google login successful:", response);

      try {
        const userData = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const userDataJson = await userData.json();
        console.log("User data from Google:", userDataJson);

        // send Google data to backend
        const fdata = new FormData();
        fdata.append("fullName", userDataJson.name);
        fdata.append("email", userDataJson.email);
        fdata.append("phoneNumber", ""); // optional
        fdata.append("password", ""); // not needed for Google

        const res = await UserService.sociallogin(fdata);

        if (res.data.success) {
           dispatch({ type: "token", value: userDataJson.access_token });
          dispatch({ type: "id", value: res.data.id });
          dispatch({ type: "name", value: res.data.fullName });
          dispatch({ type: "email", value: res.data.email });
          toast.success("Signed up successfully with Google!")
          navigate(`/dashboard`)
        } else {
          toast.error(res.data.error || "Signup failed");
        }
      } catch (error) {
        console.error("Error fetching Google user data", error);
        toast.error("Google signup failed");
      }
    },
    onError: () => {
      console.log("Google login failed");
      toast.error("Google login failed");
    },
  });

  return (
    <button
      onClick={() => login()}
      className="flex items-center justify-center p-3 border border-gray-300 rounded-full hover:bg-gray-50 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google icon"
        className="w-5 h-5"
      />
      <span className="ml-2">Sign up with Google</span>
    </button>
  );
};

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [agreeToTerms, setAgreeToTerms] = React.useState(false);

  const { dispatch } = useContext(userContext);
  const navigate = useNavigate();

  const dataSubmit = async (data) => {
    try {
      const fdata = new FormData();
      fdata.append("fullName", data.fullName);
      fdata.append("email", data.email);
      fdata.append("phoneNumber", data.phoneNumber);
      fdata.append("password", data.password);
      fdata.append("userType", "student");

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
    resolver: yupResolver(RegistrationSchema),
    mode: "all",
  });

  return (
    <div className="min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Sign Up</h1>
          <p className="text-gray-600">Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit(dataSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
 {/* FULLNAME */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="FULLNAME"
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          {/* PHONE NUMBER */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="PHONE NUMBER"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
          </div>
          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Password"
              {...register("password")}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!agreeToTerms}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white ${
              agreeToTerms
                ? "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                : "bg-blue-400 cursor-not-allowed"
            } transition duration-300`}
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google button */}
        <div className="flex justify-center">
          <GoogleOAuthProvider clientId="723006301948-7ec7qj7gdtdqaa85aoh43l0ou8icjmem.apps.googleusercontent.com">
            <GoogleSignUpButton />
          </GoogleOAuthProvider>
        </div>

        {/* Already have account */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <a
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
