import React from "react";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginSchama } from './Schemas';
import { userContext } from "../../store";
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import UserService from "../services/user.service";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { userState, dispatch } = useContext(userContext);
  const navigate = useNavigate();
    const handleSuccess = async(response) => {
        console.log('Google login successful', response);
        try {
            const userData = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${response.credential
                    }`,
                },
            });
    
            const userDataJson = await userData.json();
    
            // Now userDataJson contains the user data
            console.log('User data from Google:', userDataJson);
    
            // You can handle the user data as needed, for example, send it to the server or update your state
        } catch (error) {
            console.error('Error fetching user data from Google', error);
            // Handle the error (e.g., show an error message to the user)
        }
    };
       const handleError = (error) => {
        console.error('Google login error', error);
        // Handle the error (e.g., show an error message to the user)
    };
    const dataSubmit = async (data) => {

        var fdata = new FormData();

        fdata.append("email", data.email);
        fdata.append("password", data.password);
        var response = await UserService.login(fdata);
        console.log(response.data, 'response.data')
        if (response.data.success) {
            // setLoader(false);
            // alert('success')

            // TokenHelper.setToken(response.data.token)
            dispatch({ type: "token", value: response.data.token });
            dispatch({ type: "id", value: response.data.id });
            dispatch({ type: "name", value: response.data.fullName });
            dispatch({ type: "email", value: response.data.email });


         

            toast.success(response.data.message)
               navigate(`/dashboard`)

        }
        if (response.data.emailStatus == false) {
            toast.error(response.data.error)
            navigate(`/emailotp`, { state: { email: data.email } })

        }
        else {
            // setLoader(false);
            toast.error(response.data.error)
        }

        console.log(response.data)

    }
    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: yupResolver(LoginSchama),
        mode: "all"
    });
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Login submitted");
  // };

  return (
    <div className="min-h-[80vh] sm:min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Login to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(dataSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
              placeholder="Email Address" {...register("email")}
              
            />
             <p style={{ color: 'red' }} className='form-field-error'>{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
              placeholder="Password" {...register("password")}
              
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
             <p style={{ color: 'red' }} className='form-field-error'>{errors.password?.message}</p>
          </div>

          {/* Forgot Password */}
          <div className="w-full flex justify-end text-xs sm:text-sm mb-1">
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Login */}
        <div className="flex justify-center">
           <GoogleOAuthProvider clientId="723006301948-7ec7qj7gdtdqaa85aoh43l0ou8icjmem.apps.googleusercontent.com" scopes={['profile', 'email']}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
            >
          <button className="flex items-center justify-center w-full sm:w-auto p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google icon"
              className="w-5 h-5 mr-2"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              Continue with Google
            </span>
          </button>
          </GoogleLogin>
          </GoogleOAuthProvider>
        </div>

        {/* Register */}
        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">Don’t have an account?</span>
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500 ml-1"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
