import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShieldCheck, Mail } from "lucide-react";

import { EmailOtpSchama } from "../components/Schemas";
import UserService from "../services/user.service";
import { userContext } from "../../store";
import { useContext } from "react";

const OtpGenerator = () => {
  const { userState, dispatch } = useContext(userContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location?.state?.email;
console.log(email,'email')
  const [otp, setOtp] = useState(Array(4).fill("")); // 4 digit otp
  const inputRefs = useRef([]);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(EmailOtpSchama),
    mode: "all",
  });

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  const handleChange = (val, idx) => {
  if (/^[0-9]?$/.test(val)) {
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);

    // move focus only if not last input
    if (val && idx < otp.length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  }
};


  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const dataSubmit = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 4) {
      toast.error("Please enter a 4-digit OTP");
      return;
    }
console.log(otpValue,'otpValue')
    try {
      const fdata = new FormData();
      fdata.append("email", email);
      fdata.append("otp", otpValue);

      const response = await UserService.otpverify(fdata);

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login", { state: { email } });
      } else {
        console.log(response.data.error,'response.data.error')
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error("Something went wrong. Try again!");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 space-y-8">
        {/* Icon + Title */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            Enter the 4-digit code we sent to{" "}
            <span className="font-medium flex items-center justify-center gap-1 text-gray-800">
              <Mail className="w-4 h-4 text-blue-600" /> {email}
            </span>
          </p>
        </div>

        {/* OTP Inputs */}
       <form
  onSubmit={(e) => {
    e.preventDefault();
    dataSubmit(); // directly call your submit fn
  }}
  className="space-y-6"
>

          <div className="flex justify-between gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => handleChange(e.target.value, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={otp.join("").length < 4}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition duration-300 ${
              otp.join("").length === 4
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed"
            }`}
          >
            Verify OTP
          </button>
        </form>

        {/* Resend Option */}
        <div className="text-center text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <span className="text-blue-600 font-medium hover:underline cursor-pointer">
            Resend OTP
          </span>
        </div>
      </div>
    </div>
  );
};

export default OtpGenerator;
