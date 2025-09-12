import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Store from "../store";
import { LoginAuth } from "./components/LoginAuth.jsx";
import { LogoutAuth } from "./components/LogoutAuth.jsx";
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./components/Register"
import JobDetails from "./pages/JobDetails"
import PostInternship from "./pages/PostInternship"
import FindInternships from "./pages/FindInternships.jsx"
import EmployerProfile from "./pages/EmployerProfile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import NotFound from "./pages/NotFound"
import OtpGenerator from "./components/OtpGenerator";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import FindInternship from "./pages/FindInternship.jsx";
import Dashboard from "./pages/Dashboard";
import JobList from "./pages/JobList.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";

function App() {
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    <Store>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/resumebuilder" element={<ResumeBuilder />} />
          <Route path="/post-internship" element={<LogoutAuth><PostInternship /></LogoutAuth>} />
          <Route path="/find-internship" element={<FindInternships />} />
          <Route path="/find-internships" element={<FindInternship />} />
          <Route path="/dashboard/manage-jobs" element={<JobList />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/otp-generator" element={<OtpGenerator />} />
          <Route path="/signup" element={<LogoutAuth><SignUp /></LogoutAuth>} />
          <Route path="/login" element={<LogoutAuth><Login /></LogoutAuth>} />
          <Route path="/forgot-password" element={<LogoutAuth><ForgotPassword /></LogoutAuth>} />
          <Route path="/reset-password" element={<LogoutAuth><ResetPassword /></LogoutAuth>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Store>
    </>
  )
}

export default App
