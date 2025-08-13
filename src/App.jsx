import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Register from "./components/Register"
import JobDetails from "./pages/JobDetails"
import PostInternship from "./pages/PostInternship"
import FindInternship from "./pages/FindInternship"
import EmployerProfile from "./pages/EmployerProfile"
function App() {
  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/post-internship" element={<PostInternship />} />
          <Route path="/find-internships" element={<FindInternship />} />
          <Route path="/employer-profile" element={<EmployerProfile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
