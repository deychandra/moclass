import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import Store from "../store";
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./components/Register"
import JobDetails from "./pages/JobDetails"
import PostInternship from "./pages/PostInternship"
import FindInternship from "./pages/FindInternship"
import EmployerProfile from "./pages/EmployerProfile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import NotFound from "./pages/NotFound"

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
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/post-internship" element={<PostInternship />} />
          <Route path="/find-internships" element={<FindInternship />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Store>
    </>
  )
}

export default App
